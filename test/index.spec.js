import { actualizarPosts, loadPublications } from '../src/firebase/firestore.js';
import { components } from '../src/views/index.js';
import { muroInicioView } from '../src/views/muroInicio';
import { perfilView } from '../src/views/perfil.js';
import { editPostOptions, updatePostClick } from '../src/views/posts.js';

// import { postView } from '../src/views/posts.js';
import { publicationView } from '../src/views/publications.js';

jest.mock('../src/firebase/auth.js');
jest.mock('../src/firebase/firestore.js');
jest.mock('../src/firebase/firebaseconfig.js');

function tick() {
  return new Promise((resolve) => {
    setTimeout(resolve, 0);
  });
}

describe('formSignin', () => {
  it('Debería mostrar un error si se da click en iniciar sesion sin llenar los campos', () => {
    // DADO
    const mainSection = document.createElement('div');
    mainSection.id = 'container';
    document.body.append(mainSection);
    mainSection.appendChild(components.signin());

    const buttonLogin = document.querySelector('#btn-signin');

    expect(buttonLogin instanceof HTMLElement).toBe(true);
    // CUANDO
    buttonLogin.click();

    const complete = document.querySelector('#complete');
    // ENTONCES
    expect(complete.textContent).toEqual('Completa todos los datos');
    // verificar que el mensaje de error este dentro del documento
  });

  it('Debería cambiar de vista el usuario autentificado con correo ', async () => {
    // DADO
    const mainSection = document.createElement('div');
    mainSection.id = 'container';
    document.body.append(mainSection);
    mainSection.appendChild(components.signin());

    const buttonLogin = document.querySelector('#btn-signin');

    // CUANDO
    const inputEmail = document.querySelector('#email');
    const inputPassword = document.querySelector('#password');
    inputEmail.value = 'hola@gmail.com';
    inputPassword.value = 'holamundo';

    buttonLogin.click();

    // const complete = document.querySelector('#complete');
    await tick();
    // ENTONCES
    expect(window.location.hash).toBe('#/inicio');
    // verificar que el mensaje de error este dentro del documento
  });

  it('Debería cambiar de vista al autentificar al usuario de Google', async () => {
    // DADO
    const mainSection = document.createElement('div');
    mainSection.id = 'container';
    document.body.append(mainSection);
    mainSection.appendChild(components.signin());

    const buttonLogin = document.querySelector('#btn-signin-google');

    // CUANDO

    buttonLogin.click();

    // const complete = document.querySelector('#complete');
    await tick();
    // ENTONCES
    expect(window.location.hash).toBe('#/inicio');
    // verificar que el mensaje de error este dentro del documento
  });
});

describe('formSignup', () => {
  it('Debería mostrar un error si se da click en Registrarse sin llenar los campos', () => {
    // DADO
    const mainSection = document.createElement('div');
    mainSection.id = 'container';
    document.body.append(mainSection);
    mainSection.appendChild(components.signup());

    const buttonLogin = document.querySelector('#btn-signup');

    expect(buttonLogin instanceof HTMLElement).toBe(true);

    const inputEmail = document.querySelector('#email');
    const inputPassword = document.querySelector('#password');
    inputEmail.value = '';
    inputPassword.value = '';
    // CUANDO
    buttonLogin.click();

    const complete = document.querySelector('#complete');
    // ENTONCES
    expect(complete.textContent).toEqual('Completa todos los datos');
    // // verificar que el mensaje de error este dentro del documento
  });

  it('Debería cambiar de vista a signin', async () => {
    // DADO
    const mainSection = document.createElement('div');
    mainSection.id = 'container';
    document.body.append(mainSection);
    mainSection.appendChild(components.signup());

    // CUANDO
    // const inputName = document.querySelector('#name');
    const inputEmail = document.querySelector('#email');
    const inputPassword = document.querySelector('#password');

    // inputName.value = 'Pamela';
    inputEmail.value = 'hola@gmail.com';
    inputPassword.value = 'holamundo';

    const buttonregister = document.querySelector('#btn-signup');

    buttonregister.click();

    // const complete = document.querySelector('#complete');
    await tick();
    // ENTONCES
    expect(window.location.hash).toBe('#/signin');
    // verificar que el mensaje de error este dentro del documento
  });
});

describe('loadPublications() ', () => {
  it('Verificar que la función loadPublications() sea llamada al dar click en el boton publish ', async () => {
    const mainSection = document.createElement('div');
    mainSection.id = 'container';
    document.body.append(mainSection);
    mainSection.appendChild(publicationView());

    const buttonsubbmit = document.querySelector('#publish');

    const inputText = document.querySelector('#inputText');
    inputText.value = 'Contenido de publicación';

    buttonsubbmit.click();
    expect(loadPublications).toHaveBeenCalled();
  });
});

describe('Verificar los post', () => {
  it('Verificar que la función actualizarPost sea llamada ', async () => {
    const mainSection = document.createElement('div');
    mainSection.id = 'container';
    document.body.append(mainSection);

    mainSection.appendChild(muroInicioView());

    const postContainer = document.querySelector('#postContainer');
    expect(postContainer instanceof HTMLElement).toBe(true);
    expect(actualizarPosts).toHaveBeenCalled();
  });
  it('Verificar que la función  ', async () => {
    const mainSection = document.createElement('div');

    document.body.append(mainSection);

    mainSection.appendChild(muroInicioView());

    const postContainer = document.querySelector('#postContainer');

    editPostOptions(postContainer);

    const listNodos = '<div class="editPostIcon" data-id = "12324"></div>';
    postContainer.innerHTML = listNodos;
    // const iconEditPost = document.querySelectorAll('.editPostIcon');
    
    // iconEditPost.forEach((icon) => console.log(icon.dataset.id));
  });
});










// describe('inicioView() ', () => {
//   it.only('Inicio view muestre la vista perfil', async () => {
//     const mainSection = document.createElement('div');

//     document.body.append(mainSection);

//     const container = document.createElement('div');

//     mainSection.append(components.inicio(container));

//     const navToggle = document.createElement('div');
//     navToggle.setAttribute('class', 'nav-toggle');
//     mainSection.appendChild(navToggle);
//     const navTog = document.querySelector('.nav-toggle');
//     console.log(navTog);
//     // mainSection.appendChild(navToggle);
//   });
// });









describe('Muro', () => {
  it('El componente muro sea un elemento Html', async () => {
    const mainSection = document.createElement('div');
    mainSection.id = 'container';
    document.body.append(mainSection);
    const container = document.createElement('div');
    mainSection.appendChild(components.muro(container));

    const muro = document.querySelector('#muroContainer');

    expect(muro instanceof HTMLElement).toBe(true);
  });
});

describe('Perfil', () => {
  it('El componente perfil sea un elemento Html', async () => {
    const mainSection = document.createElement('div');
    mainSection.id = 'container';
    document.body.append(perfilView());

    expect(perfilView() instanceof HTMLElement).toBe(true);
  });
});

describe('Home', () => {
  it('El componente Home sea un elemento Html', async () => {
    const mainSection = document.createElement('div');
    mainSection.id = 'container';
    document.body.append(components.Home());
    const perfilview = document.querySelector('#perfilView');
    perfilview.click();
    expect(components.Home() instanceof HTMLElement).toBe(true);
  });
});
