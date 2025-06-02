import React from "react";

export default function LegalNotice() {
  return (
    <div className="pt-30 max-w-4xl mx-auto p-6 space-y-12">
      <section>
        <h1 className="text-3xl font-bold mb-4">Menções Legais</h1>
        <p className="text-base"><strong>Responsável pelo site:</strong> Rui Baltazar</p>
        <p className="text-base"><strong>Empresa:</strong> Eagle Intuition</p>
        <p className="text-base"><strong>Forma jurídica:</strong> Sociedade Unipessoal por Quotas</p>
        <p className="text-base"><strong>Sede:</strong> R. Piteira Santos 30 Loja B, 2975-333 Quinta do Conde, Portugal</p>
        <p className="text-base"><strong>Capital Social:</strong> (não aplicável ou não fornecido)</p>
        <p className="text-base"><strong>Email:</strong> info@ei.edu.pt</p>
        <p className="text-base"><strong>Telefone:</strong> +351 21 210 4522</p>
        <p className="text-base"><strong>NIF (número de identificação fiscal):</strong> 513398970</p>

        <h2 className="text-2xl font-semibold mt-6">Hospedagem</h2>
        <p className="text-base">O site é hospedado pela Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, EUA — <a href="https://vercel.com" className="text-blue-600 underline">https://vercel.com</a></p>

        <h2 className="text-2xl font-semibold mt-6">Tratamento de Dados Pessoais</h2>
        <p className="text-base"><strong>Responsável pelo tratamento:</strong> Rui Baltazar – Eagle Intuition</p>
        <p className="text-base">Email: info@ei.edu.pt</p>

        <h3 className="text-title text-xl font-semibold mt-4">Finalidade da Recolha</h3>
        <ul className="list-disc list-inside ml-4">
          <li className="text-base">Formulário de contacto: receber informações e responder aos pedidos dos utilizadores</li>
          <li className="text-base">Google Analytics: analisar e melhorar a experiência do utilizador no site</li>
          <li className="text-base">Newsletter: enviar atualizações e informações relevantes</li>
        </ul>

        <h3 className="text-title text-xl font-semibold mt-4">Base Legal do Tratamento</h3>
        <ul className="list-disc list-inside ml-4">
          <li className="text-base">Consentimento explícito do utilizador</li>
          <li className="text-base">Interesse legítimo para melhoria contínua do site</li>
        </ul>

        <h3 className="text-title text-xl font-semibold mt-4">Destinatários dos Dados</h3>
        <p className="text-base">Apenas a empresa Eagle Intuition tem acesso aos dados recolhidos, bem como serviços contratados com obrigações de confidencialidade e conformidade com o RGPD.</p>

        <h3 className="text-title text-xl font-semibold mt-4">Direitos dos Utilizadores</h3>
        <ul className="list-disc list-inside ml-4">
          <li className="text-base">Direito de acesso, retificação, apagamento</li>
          <li className="text-base">Direito de oposição e limitação do tratamento</li>
          <li className="text-base">Direito à portabilidade</li>
          <li className="text-base">Direito de apresentar uma reclamação à CNPD: <a href="https://www.cnpd.pt" className="text-blue-600 underline">https://www.cnpd.pt</a></li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6">Propriedade Intelectual</h2>
        <p className="text-base">Todos os conteúdos deste site (textos, imagens, logótipos) estão protegidos por direitos de autor. É proibida a sua reprodução sem autorização prévia.</p>
        <p className="text-base">Créditos de imagem: imagens livres de direitos, incluindo imagens de Freepik.</p>

        <h2 className="text-2xl font-semibold mt-6">Cookies</h2>
        <p className="text-base">Este site utiliza cookies para otimizar a navegação e analisar estatísticas de audiência. O utilizador pode configurar ou recusar os cookies através do seu navegador.</p>
      </section>
    </div>
  );
}
