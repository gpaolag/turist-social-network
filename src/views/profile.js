import { sessionStorageCall } from '../componentes/sessionStorage.js';

import {
  getPosts, getUserById, updateCreatorName, updateUser,
} from '../firebase/firestore.js';

export const profileView = async () => {
  const perfil = document.querySelector('#firstPerfil');
  perfil.style.display = 'none';

  const userObject = sessionStorageCall();

  // eslint-disable-next-line no-use-before-define
  tenplateEditProfile(userObject);
};

function tenplateEditProfile(userObject) {
  const perfilContainer = document.getElementById('perfilUser');

  const perfilContent = `
    <div class="firstDivPerfil2">
      <div class="photoPerfil">
        <img id="imgPerfil" src="${userObject.profilePhoto}">
      </div>
      <h2 class="nombreuser">${userObject.name}</h2> 
      <div class="divPerfil">
    <div class="divPerfil">
      <h3><i class="fa fa-user"></i> Descripción</h3>
      <p>${userObject.description}</p>
    </div>
    <div class="divPerfil">
      <h3><i class="fa fa-globe"></i> País</h3>
      <p>${userObject.country}</p>
    </div>
    <div class="divPerfil">
      <h3><i class="fa fa-gratipay"></i> Intereses</h3>
      <p>${userObject.interest}</p>
    </div>
  </div>
      <button id='editPerfil'><i class="fa fa-pencil"></i> Editar perfil  </button>
      <dialog id='modalEdit'><dialog>
    </div>

      `;

  perfilContainer.innerHTML = perfilContent;

  const editPeril = perfilContainer.querySelector('#editPerfil');
  // eslint-disable-next-line no-use-before-define
  editPeril.addEventListener('click', editPerfilUser);
  return perfilContainer;
}

async function editPerfilUser() {
  const modalEdit = document.querySelector('#modalEdit');
  const userObject = sessionStorageCall();

  const perfilData = await getUserById(userObject.id, 'users');

  // eslint-disable-next-line no-use-before-define
  modalEdit.innerHTML = modalEditPerfil(
    perfilData.name,
    perfilData.description,
    perfilData.country,
    perfilData.interest,
    perfilData.profilePhoto,

  );
  if (!modalEdit.open) {
    modalEdit.showModal();
  }
  const cancelButton = document.querySelector('#cancelButton');
  cancelButton.addEventListener('click', () => {
    modalEdit.close();
  });

  const guardarButton = document.querySelector('#guardarButton');
  guardarButton.addEventListener('click', async () => {
    const namepefil = document.querySelector('#namepefil').value;
    const descriptionpefil = document.querySelector('#descriptionpefil').value;
    const paispefil = document.querySelector('#paispefil').value;
    const interesespefil = document.querySelector('#interesespefil').value;
    const userStorage = {
      country: paispefil,
      description: descriptionpefil,
      id: userObject.id,
      interest: interesespefil,
      name: namepefil,
      profilePhoto: '../img/user.png',
    };
    // llama otra vez a la funcion
    sessionStorage.setItem('USER', JSON.stringify(userStorage));
    const userObj = sessionStorageCall();
    tenplateEditProfile(userObj);

    updateUser(userObject.id, namepefil, descriptionpefil, paispefil, interesespefil);
    modalEdit.close();

    const postsUser = await getPosts(userObj.id);
    postsUser.forEach((doc) => {
      updateCreatorName(doc.id, namepefil);
    });
  });
}
function modalEditPerfil(name, description, pais, intereses, photo) {
  const editModalContent = `
  <div id = "modalCharginEdit" style = "display:none">
    <p>Cargando ...</p>
    <img width="150px" height="100px" src=""/>
  </div>
  <div id=''>
    <div >
      <div class="photoPerfil">
        <img id="imgPerfil" src="${photo}">
      </div>
      <div class="inputFiles relative">
          <label for="compartirImg"></label>
          <input type="file"  id="inputSelectImg" >
      </div>
      <input class="" id='namepefil' value='${name}'>
    </div>
    <div class="divPerfil">
      <div class="divPerfil">
        <h3><i class="fa fa-user"></i> Descripción</h3>
        <input id='descriptionpefil' value='${description}'>
      </div>
      <div class="divPerfil">
        <h3><i class="fa fa-globe"></i> País</h3>
        <input id='paispefil' value='${pais}'>
      </div>
      <div class="divPerfil">
        <h3><i class="fa fa-gratipay"></i> Intereses</h3>
        <input id='interesespefil' value='${intereses}'>
      </div>
    </div> 
    <div class="botonesProfile">
      <button id='guardarButton'>Guardar </button>
      <button id='cancelButton'>Cancelar</button>
    </div>
  </div>`;

  return editModalContent;
}
