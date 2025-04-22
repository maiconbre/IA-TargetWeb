import React from 'react';
import { motion } from 'framer-motion';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1A1F2E] to-[#0D121E] text-white p-6 sm:p-8 lg:p-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#F0B35B] mb-8">Política de Privacidade</h1>
        
        <div className="space-y-6 text-gray-300">
          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-white">1. Introdução</h2>
            <p>A presente Política de Privacidade tem por finalidade demonstrar o compromisso da BarberShop com a privacidade e a proteção dos dados pessoais coletados, estabelecendo as regras sobre a coleta, registro, armazenamento, uso, compartilhamento e eliminação dos dados coletados dentro do escopo dos serviços e funcionalidades do nosso site e plataforma, de acordo com as leis em vigor, com transparência e clareza junto aos usuários e clientes.</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-white">2. Dados Coletados</h2>
            <p>Coletamos os seguintes tipos de dados:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Dados de identificação (nome, CNPJ/CPF, e-mail)</li>
              <li>Dados de contato (telefone, endereço)</li>
              <li>Dados de pagamento (informações de cartão de crédito, dados bancários)</li>
              <li>Dados de uso da plataforma (logs, registros de acesso)</li>
              <li>Dados de agendamento (horários, serviços)</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-white">3. Finalidade do Uso dos Dados</h2>
            <p>Utilizamos os dados coletados para:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Prestação dos serviços contratados</li>
              <li>Processamento de pagamentos</li>
              <li>Comunicação sobre serviços, atualizações e suporte</li>
              <li>Melhorias na plataforma e experiência do usuário</li>
              <li>Cumprimento de obrigações legais e regulatórias</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-white">4. Compartilhamento de Dados</h2>
            <p>Seus dados podem ser compartilhados com:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Prestadores de serviços essenciais para nossa operação</li>
              <li>Parceiros de processamento de pagamento</li>
              <li>Autoridades públicas, quando exigido por lei</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-white">5. Armazenamento e Segurança</h2>
            <p>Todos os dados são armazenados em ambiente seguro e controlado, utilizando modernas tecnologias de criptografia e proteção contra acessos não autorizados. Mantemos os dados apenas pelo tempo necessário para cumprir as finalidades para as quais foram coletados, exceto quando houver exigência legal de retenção por período superior.</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-white">6. Direitos dos Titulares</h2>
            <p>Em conformidade com a LGPD, você tem direito a:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Confirmar a existência de tratamento de dados</li>
              <li>Acessar seus dados</li>
              <li>Corrigir dados incompletos ou desatualizados</li>
              <li>Solicitar a anonimização ou eliminação de dados desnecessários</li>
              <li>Revogar o consentimento</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-white">7. Cookies e Tecnologias de Rastreamento</h2>
            <p>Utilizamos cookies e tecnologias similares para melhorar a experiência do usuário, analisar o tráfego e personalizar conteúdo. Você pode configurar seu navegador para recusar cookies, mas isso pode afetar algumas funcionalidades da plataforma.</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-white">8. Alterações na Política</h2>
            <p>Esta política pode ser atualizada periodicamente. A versão mais recente estará sempre disponível em nossa plataforma. Alterações significativas serão comunicadas por e-mail ou através de notificação na plataforma.</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-white">9. Contato</h2>
            <p>Para exercer seus direitos ou esclarecer dúvidas sobre esta Política de Privacidade, entre em contato através do e-mail: privacidade@barbershop.com.br</p>
          </section>

          <footer className="pt-8 text-sm text-gray-400">
            <p>Última atualização: Abril de 2025</p>
          </footer>
        </div>
      </motion.div>
    </div>
  );
};

export default PrivacyPolicy;
