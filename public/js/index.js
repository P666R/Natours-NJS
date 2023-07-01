/* eslint-disable */

import 'core-js/stable';
import 'regenerator-runtime/runtime';

import { login } from './login.js';
import { displayMap } from './leaflet.js';

// dom elements
const leaflet = document.getElementById('map');
const loginForm = document.querySelector('.form');

// delegation
if (leaflet) {
  const locations = JSON.parse(leaflet.dataset.locations);
  displayMap(locations);
}

if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
  });
}
