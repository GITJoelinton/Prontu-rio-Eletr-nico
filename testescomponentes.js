// -------------------------
// TESTES   DE COMPONENTES DO MEDSYSTEM
// -------------------------

// Teste automático de login com o usuário "demo"
function testeLoginDemo() {
    // Pega os campos de usuário e senha do formulário de login
    const username = document.getElementById('username');
    const password = document.getElementById('password');
  
    // Se algum dos campos não for encontrado, exibe um aviso e para o teste
    if (!username || !password) return console.warn('Campos de login não encontrados');
  
    // Preenche os campos com o usuário demo
    username.value = 'demo';
    password.value = 'demo';
  
    // Encontra o formulário de login
    const form = document.getElementById('loginForm');
  
    // Dispara o evento de envio do formulário (submit)
    form.dispatchEvent(new Event('submit'));
  
    // Aguarda 1 segundo para o sistema processar o login
    setTimeout(() => {
      // Verifica se o nome do usuário logado aparece no dashboard
      const nomeUsuario = document.querySelector('.user-info span');
      const avatar = document.querySelector('.user-avatar');
  
      // Valida se o nome de usuário contém "Demo", sinal de login correto
      if (nomeUsuario && nomeUsuario.textContent.includes('Demo')) {
        console.log('✅ Teste Login com usuário demo: PASSOU');
      } else {
        console.error('❌ Teste Login com usuário demo: FALHOU');
      }
    }, 1000);
  }
  
  // Teste de navegação para a seção "Pacientes"
  function testeNavegacaoPacientes() {
    // Busca o link do menu lateral que leva para "Pacientes"
    const linkPacientes = [...document.querySelectorAll('.sidebar-menu a')]
      .find(a => a.textContent.includes('Pacientes'));
  
    // Se o link não existir, exibe um aviso
    if (!linkPacientes) return console.warn('Link para pacientes não encontrado');
  
    // Simula um clique no link
    linkPacientes.click();
  
    // Espera 500ms para o conteúdo ser carregado
    setTimeout(() => {
      // Verifica se o título da página mudou para "Pacientes"
      const titulo = document.getElementById('pageTitle').textContent;
  
      // Verifica se o conteúdo da seção "Pacientes" está visível
      const pacientesVisiveis = document.getElementById('patientsContent').style.display === 'block';
  
      // Confirma se a navegação foi bem-sucedida
      if (titulo === 'Pacientes' && pacientesVisiveis) {
        console.log('✅ Teste navegação para Pacientes: PASSOU');
      } else {
        console.error('❌ Teste navegação para Pacientes: FALHOU');
      }
    }, 500);
  }
  
  // Teste que tenta cadastrar um paciente com formulário vazio
  function testeCadastroPacienteInvalido() {
    // Abre a tela de "Novo Paciente"
    showDashboardContent('newPatient');
  
    // Pega o formulário e limpa os campos
    const form = document.getElementById('patientForm');
    form.reset();
  
    // Substitui temporariamente a função alert() para evitar pop-ups
    let alerta = false;
    const alertaOriginal = window.alert;
    window.alert = () => { alerta = true; };
  
    // Dispara o envio do formulário
    form.dispatchEvent(new Event('submit'));
  
    // Aguarda 500ms para verificar se o alerta foi chamado (ou seja, se tentou cadastrar)
    setTimeout(() => {
      if (!alerta) {
        console.log('✅ Teste validação de novo paciente (vazio): PASSOU');
      } else {
        console.error('❌ Teste validação de novo paciente: FALHOU (aceitou campos vazios)');
      }
      // Restaura o comportamento original do alert()
      window.alert = alertaOriginal;
    }, 500);
  }
  
  // -------------------------
  // Lista de testes disponíveis (opcional para uso futuro)
  // -------------------------
  const testesDisponiveis = {
    testeLoginDemo,
    testeNavegacaoPacientes,
    testeCadastroPacienteInvalido
  };