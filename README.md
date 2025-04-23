# gym-pass-api
An API for managing gym access, utilizing design patterns and SOLID principles.


## RFs (requisitos funcionais)

- [x] Deve ser possivel se cadastrar;
- [ ] Deve ser possivel se autenticar;
- [ ] Deve ser possivel obter o perfil de um usuário logado;
- [ ] Deve ser possivel obter o numero de check-ins realizados pelo usuário logado;
- [ ] Deve ser possivel o usuário obter o seu histórico de check-ins;
- [ ] Deve ser possivel o usuário buscar academias próximas;
- [ ] Deve ser possivel o usuário buscar academias pelo nome;
- [ ] Deve ser possivel o usuário realizar check-in em uma academia;
- [ ] Deve ser possivel validar o check-in de um usuário;
- [ ] Deve ser possivel cadastrar uma academia;


## RNs (regras de negocio)

- [x] O usuário não deve poder se cadastrar com um email duplicado;
- [ ] O usuário não pode fazer check-in 2 vezes no mesmo dia;
- [ ] O usuário não pode fazer check-in se não estiver perto (100m) da academia;
- [ ] O check-in só pode ser validado até 20 min depois de ser criado;
- [ ] O check-in só pode ser validado por administradores;
- [ ] Academias só podem ser cadastradas por administradores;


## RNFs (requisitos não funcionais)

- [x] A senha do usuário deve ser criptografada;
- [ ] Os dados da aplicação precisam estar persistidos em um banco de dados;
- [ ] Todas as listas de dados precisam estar paginadas com 20 items por página;
- [ ] O usuário deve ser identificado por um JWT (json web token)