import React from 'react';
import { motion } from 'framer-motion';

const TermsOfUse: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1A1F2E] to-[#0D121E] text-white p-6 sm:p-8 lg:p-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#F0B35B] mb-8">Termos de Uso</h1>
        
        <div className="space-y-6 text-gray-300">
          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-white">1. Aceitação dos Termos</h2>
            <p>Ao acessar e utilizar a plataforma BarberShop, você concorda com estes Termos de Uso e todas as condições aqui estabelecidas. Se você não concordar com algum aspecto destes termos, não utilize nossos serviços.</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-white">2. Descrição do Serviço</h2>
            <p>A BarberShop é uma plataforma SaaS (Software as a Service) que oferece:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Sistema de agendamento online para barbearias</li>
              <li>Gestão de clientes e serviços</li>
              <li>Controle financeiro e relatórios</li>
              <li>Ferramentas de marketing e fidelização</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-white">3. Cadastro e Conta</h2>
            <p>Para utilizar nossos serviços, você deve:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Fornecer informações verdadeiras e atualizadas</li>
              <li>Manter a segurança de suas credenciais de acesso</li>
              <li>Ser maior de 18 anos ou possuir representação legal</li>
              <li>Possuir capacidade jurídica para contratar</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-white">4. Pagamento e Assinatura</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Os valores são cobrados mensalmente ou anualmente, conforme o plano escolhido</li>
              <li>O pagamento é processado através de gateways seguros</li>
              <li>A assinatura será renovada automaticamente</li>
              <li>O cancelamento deve ser solicitado com 30 dias de antecedência</li>
              <li>Não há reembolso de valores já pagos</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-white">5. Responsabilidades do Usuário</h2>
            <p>O usuário se compromete a:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Utilizar o serviço de acordo com a legislação vigente</li>
              <li>Não violar direitos de propriedade intelectual</li>
              <li>Não compartilhar sua conta com terceiros</li>
              <li>Manter seus dados cadastrais atualizados</li>
              <li>Responsabilizar-se pelo conteúdo publicado</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-white">6. Limitação de Responsabilidade</h2>
            <p>A BarberShop não se responsabiliza por:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Interrupções temporárias do serviço para manutenção</li>
              <li>Problemas causados por falhas de internet do usuário</li>
              <li>Perda de dados por força maior</li>
              <li>Uso indevido da plataforma pelo usuário</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-white">7. Propriedade Intelectual</h2>
            <p>Todos os direitos de propriedade intelectual relativos ao serviço, incluindo software, design, marcas e conteúdo são de propriedade exclusiva da BarberShop ou devidamente licenciados.</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-white">8. Modificações dos Termos</h2>
            <p>A BarberShop se reserva o direito de modificar estes termos a qualquer momento, mediante notificação prévia de 30 dias aos usuários. O uso continuado do serviço após as alterações implica na aceitação dos novos termos.</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-white">9. Rescisão</h2>
            <p>A BarberShop pode suspender ou encerrar sua conta em caso de:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Violação destes termos</li>
              <li>Inadimplência</li>
              <li>Uso fraudulento da plataforma</li>
              <li>Solicitação de autoridades competentes</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-white">10. Lei Aplicável</h2>
            <p>Estes termos são regidos pelas leis brasileiras. Qualquer disputa será resolvida no foro da comarca do Rio de Janeiro - RJ, com exclusão de qualquer outro, por mais privilegiado que seja.</p>
          </section>

          <footer className="pt-8 text-sm text-gray-400">
            <p>Última atualização: Abril de 2025</p>
          </footer>
        </div>
      </motion.div>
    </div>
  );
};

export default TermsOfUse;
