import React from "react";

export default function LegalPages() {
  return (
    <div className="pt-30 max-w-4xl mx-auto p-6 space-y-12">
      <section>
        <h1 className="text-3xl font-bold mb-4">Política de Privacidade e Proteção de Dados Pessoais</h1>
        <p className="text-base"><strong>Nome do responsável:</strong> Rui Baltazar</p>
        <p className="text-base"><strong>Empresa:</strong> Eagle Intuition</p>
        <p className="text-base"><strong>Forma jurídica:</strong> Sociedade Unipessoal por Quotas</p>
        <p className="text-base"><strong>Número de identificação fiscal:</strong> 513398970</p>
        <p className="text-base"><strong>Endereço:</strong> R. Piteira Santos 30 Loja B, 2975-333 Q.ta do Conde, Portugal</p>
        <p className="text-base"><strong>Email:</strong> info@ei.edu.pt</p>
        <p className="text-base"><strong>Telefone:</strong> +351 21 210 4522</p>
        <p className="text-base"><strong>Diretor de publicação:</strong> Rui Baltazar</p>
        <p className="text-base"><strong>Hospedagem:</strong> Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, USA — <a href="https://vercel.com" className="text-blue-600 underline">https://vercel.com</a></p>
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-4">Política de Privacidade</h2>
        <p className="text-base"><strong>Responsável pelo tratamento:</strong> Rui Baltazar – Eagle Intuition</p>
        <p className="text-base"><strong>Email:</strong> info@ei.edu.pt</p>

        <h3 className="text-title text-xl font-semibold mt-6">1. Dados recolhidos</h3>
        <p className="text-base">Recolhemos os seguintes dados:</p>
        <ul className="list-disc list-inside ml-4">
          <li className="text-base">Endereço de email através da inscrição na newsletter</li>
          <li className="text-base">Nome, apelido, email e número de telefone através do formulário de contacto</li>
          <li className="text-base">Dados de navegação anonimizados via Google Analytics</li>
          <li className="text-base">Dados de desempenho e indexação através do Google Search Console</li>
        </ul>

        <h3 className="text-title text-xl font-semibold mt-6">2. Finalidade</h3>
        <p className="text-base">Os dados são utilizados para:</p>
        <ul className="list-disc list-inside ml-4">
          <li className="text-base">Responder a solicitações feitas através do formulário de contacto</li>
          <li className="text-base">Enviar newsletters e comunicações</li>
          <li className="text-base">Analisar o público e melhorar a experiência do utilizador</li>
          <li className="text-base">Acompanhar o desempenho do site e o seu posicionamento</li>
        </ul>

        <h3 className="text-title text-xl font-semibold mt-6">3. Base legal</h3>
        <p className="text-base">O tratamento baseia-se em:</p>
        <ul className="list-disc list-inside ml-4">
          <li className="text-base">Consentimento do utilizador</li>
          <li className="text-base">O nosso interesse legítimo em melhorar os nossos serviços</li>
        </ul>

        <h3 className="text-title text-xl font-semibold mt-6">4. Partilha</h3>
        <p className="text-base">Os dados podem ser partilhados com:</p>
        <ul className="list-disc list-inside ml-4">
          <li className="text-base">Ferramentas de análise de audiência (Google Analytics, Google Search Console)</li>
          <li className="text-base">Serviços de email marketing para a gestão da newsletter</li>
        </ul>
        <p className="text-base">Todos os subcontratantes estão sujeitos a obrigações rigorosas de confidencialidade e em conformidade com o RGPD.</p>

        <h3 className="text-title text-xl font-semibold mt-6">5. Duração de conservação</h3>
        <p className="text-base">Os dados são conservados por um período máximo de 365 dias a contar do último contacto ou da anulação da subscrição.</p>

        <h3 className="text-title text-xl font-semibold mt-6">6. Os seus direitos</h3>
        <p className="text-base">De acordo com o RGPD, tem os seguintes direitos:</p>
        <ul className="list-disc list-inside ml-4">
          <li className="text-base">Direito de acesso, retificação e eliminação</li>
          <li className="text-base">Direito de oposição e limitação</li>
          <li className="text-base">Direito à portabilidade dos seus dados</li>
          <li className="text-base">Direito de apresentar reclamação junto da CNPD (Portugal)</li>
        </ul>
        <p className="text-base">Para exercer os seus direitos, contacte-nos através do email: <a href="mailto:info@ei.edu.pt" className="text-blue-600 underline">info@ei.edu.pt</a></p>
      </section>
    </div>
  );
}