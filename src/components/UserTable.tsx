import React, { useState } from "react";
import { User } from "../types/User";
import { ChevronDown, Search } from "lucide-react";

export const UserTable = () => {
  const [user, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

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
          <h2 className="text-lg font-medium text-gray-900">Funcionários</h2>
          <div className="relative w-full md:w-auto">
            <input
              type="text"
              placeholder="Pesquisar"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border rounded-lg w-full md:w-[300px] bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-[#0500FF] text-white h-[47px]">
              <tr>
                <th className="px-6 py-3 text-left">FOTO</th>
                <th className="px-6 py-3 text-left">NOME</th>
                <th className="px-6 py-3 text-left">CARGO</th>
                <th className="px-6 py-3 text-left">DATA DE ADMISSÁO</th>
                <th className="px-6 py-3 text-left">TELEFONE</th>
                <th className="px-6 py-3 md:hidden"></th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              <tr className="group">
                <td className="px-6 py-4">
                  <img
                    src="/placeholderAvatar.svg"
                    alt="Usuário Placeholder"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </td>
                <td className="px-6 py-4 font-medium">Nome do usuário</td>
                <td className="px-6 py-4 font-medium">Cargo do usuário</td>
                <td className="px-6 py-4 font-medium">24/02/2025</td>
                <td className="px-6 py-4 font-medium">83-99999-9999</td>
              </tr>
              <tr className="group">
                <td className="px-6 py-4">
                  <img
                    src="/placeholderAvatar.svg"
                    alt="Usuário Placeholder"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </td>
                <td className="px-6 py-4 font-medium">Nome do usuário</td>
                <td className="px-6 py-4 font-medium">Cargo do usuário</td>
                <td className="px-6 py-4 font-medium">24/02/2025</td>
                <td className="px-6 py-4 font-medium">83-99999-9999</td>
              </tr>
              <tr className="group">
                <td className="px-6 py-4">
                  <img
                    src="/placeholderAvatar.svg"
                    alt="Usuário Placeholder"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </td>
                <td className="px-6 py-4 font-medium">Nome do usuário</td>
                <td className="px-6 py-4 font-medium">Cargo do usuário</td>
                <td className="px-6 py-4 font-medium">24/02/2025</td>
                <td className="px-6 py-4 font-medium">83-99999-9999</td>
              </tr>
              <tr className="group">
                <td className="px-6 py-4">
                  <img
                    src="/placeholderAvatar.svg"
                    alt="Usuário Placeholder"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </td>
                <td className="px-6 py-4 font-medium">Nome do usuário</td>
                <td className="px-6 py-4 font-medium">Cargo do usuário</td>
                <td className="px-6 py-4 font-medium">24/02/2025</td>
                <td className="px-6 py-4 font-medium">83-99999-9999</td>
              </tr>
              <tr className="group">
                <td className="px-6 py-4">
                  <img
                    src="/placeholderAvatar.svg"
                    alt="Usuário Placeholder"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </td>
                <td className="px-6 py-4 font-medium">Nome do usuário</td>
                <td className="px-6 py-4 font-medium">Cargo do usuário</td>
                <td className="px-6 py-4 font-medium">24/02/2025</td>
                <td className="px-6 py-4 font-medium">83-99999-9999</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
