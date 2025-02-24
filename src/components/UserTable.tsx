import React, { useEffect, useState } from "react";
import { User } from "../types/User";
import { ChevronDown, Search } from "lucide-react";
import axios from "axios";
import Loading from "./Loading";
import { formatDate, formatPhone } from "../utils/formatter";
import { useDebounce } from "use-debounce";

export const UserTable = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchInput, setSearchInput] = useState("");
  const [expandedRows, setExpandedRows] = useState<{ [key: number]: boolean }>(
    {}
  );
  const [searchTerm] = useDebounce(searchInput, 300);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3001/employees");
        setUsers(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load users");
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter((user) => {
    // Retorna todos os usuários se a busca estiver vazia
    if (!searchTerm.trim()) return true;

    const searchTermLower = searchTerm.toLowerCase().trim();

    // Busca de telefone
    if (searchTerm.includes("-") || /^\d+$/.test(searchTerm)) {
      // Remove caracteres não numéricos
      const cleanSearchPhone = searchTerm.replace(/\D/g, "");
      const cleanUserPhone = user.phone.replace(/\D/g, "");

      if (cleanUserPhone.includes(cleanSearchPhone)) return true;
    }

    // Busca por nome
    const nameParts = user.name.toLowerCase().split(" ");
    for (const part of nameParts) {
      if (part.startsWith(searchTermLower)) return true;
    }

    // Busca por cargo
    const jobParts = user.job.toLowerCase().split(" ");
    for (const part of jobParts) {
      if (part.startsWith(searchTermLower)) return true;
    }

    return false;
  });

  if (loading) return <Loading />;
  if (error)
    return <div className="text-center text-[#0500ff] p-8">{error}</div>;

  const toggleRow = (id: number) => {
    setExpandedRows((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="min-h-screen bg-[#F0F0F0] mx-auto">
      <div className="border-gray-300 shadow-lg rounded-md bg-white">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <img src="/Logo.png" alt="BeTalent" className="h-auto" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4">
        {/* Barra de pesquisa */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <h2 className="text-[20px] font-semibold text-[#1C1C1C]">
            Funcionários
          </h2>
          <div className="relative w-full md:w-auto">
            <input
              type="text"
              placeholder="Pesquisar"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="pl-10 pr-4 py-2 border rounded-lg w-full md:w-[300px] bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          </div>
        </div>

        {/* Desktop */}
        <div className="hidden md:block bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-[#0500FF] text-white h-[47px] font-semibold text-base ">
              <tr>
                <th className="px-6 py-3 text-left">FOTO</th>
                <th className="px-6 py-3 text-left">NOME</th>
                <th className="px-6 py-3 text-left">CARGO</th>
                <th className="px-6 py-3 text-left">DATA DE ADMISSÁO</th>
                <th className="px-6 py-3 text-left">TELEFONE</th>
                <th className="px-6 py-3 md:hidden"></th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200 text-[#1C1C1C] font-normal text-base">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-150">
                    <td className="px-6 py-4">
                      <img
                        src={user.image || "/placeholder.svg"}
                        alt={user.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    </td>
                    <td className="px-6 py-4 font-medium">{user.name}</td>
                    <td className="px-6 py-4 font-medium">{user.job}</td>
                    <td className="px-6 py-4 font-medium">
                      {formatDate(user.admission_date)}
                    </td>
                    <td className="px-6 py-4 font-medium">
                      {formatPhone(user.phone)}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="px-6 py-4 text-center text-gray-500">
                    Não existe usuários com esse nome
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile */}
        <div className="md:hidden">
          <div className="bg-[#0500FF] text-white rounded-t-lg flex items-center h-10">
            <div className="px-4 py-2 w-1/4 text-left">FOTO</div>
            <div className="px-4 py-2 w-2/4 text-left">NOME</div>
            <div className="px-4 py-2 w-1/4 text-center">
              <div className="w-2 h-2 bg-white rounded-full mx-auto"></div>
            </div>
          </div>

          <div className="space-y-px ">
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user, index) => (
                <div
                  key={user.id}
                  className={`bg-white shadow ${
                    index === filteredUsers.length - 1 ? "rounded-b-lg" : ""
                  }`}
                >
                  <div
                    className="flex items-center px-4 py-3"
                    onClick={() => toggleRow(user.id)}
                  >
                    <div className="w-1/4">
                      <img
                        src={user.image || "/placeholder.svg"}
                        alt={user.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    </div>
                    <div className="w-2/4">
                      <p className="font-medium">{user.name}</p>
                    </div>
                    <div className="w-1/4 flex justify-center">
                      <ChevronDown
                        className={`w-6 h-6 ml-4 transition-transform duration-200 text-[#0500FF] ${
                          expandedRows[user.id] ? "rotate-180" : ""
                        }`}
                      />
                    </div>
                  </div>
                  {expandedRows[user.id] && (
                    <div className="px-4 py-3 border-t border-gray-200">
                      <div className="space-y-2">
                        <p className="text-sm">
                          <span className="font-medium">Cargo:</span> {user.job}
                        </p>
                        <p className="text-sm">
                          <span className="font-medium">Data de Admissão:</span>{" "}
                          {formatDate(user.admission_date)}
                        </p>
                        <p className="text-sm">
                          <span className="font-medium">Telefone:</span>{" "}
                          {formatPhone(user.phone)}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="bg-white rounded-b-lg shadow p-4 text-center text-gray-500">
                Nenhum usuário encontrado
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
