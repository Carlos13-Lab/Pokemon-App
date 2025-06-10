# Pokémon App

¡Bienvenido a la **Pokémon App**! Este proyecto es una aplicación web que permite a los usuarios explorar una lista de Pokémon, ver detalles específicos de cada uno, filtrar y ordenar Pokémon, y eliminar aquellos creados por los usuarios.

## 🚀 Tecnologías utilizadas

Este proyecto fue desarrollado utilizando las siguientes tecnologías:

- **React**: Biblioteca de JavaScript para construir interfaces de usuario.
- **Zustand**: Librería para la gestión del estado global.
- **React Router**: Para la navegación entre páginas.
- **React Loading**: Para mostrar indicadores de carga.
- **CSS**: Para los estilos personalizados de la aplicación.
- **Fetch API**: Para realizar solicitudes HTTP a la API.
- **Node.js** (Backend): Para manejar las solicitudes de la API (si aplica).
- **API personalizada**: Para obtener y gestionar los datos de los Pokémon.

## 📂 Estructura del proyecto

Pokemon-App/ ├── client/ │ ├── src/ │ │ ├── components/ │ │ │ ├── Card.jsx │ │ │ ├── Nav.jsx │ │ │ └── Paginate.jsx │ │ ├── pages/ │ │ │ ├── Home.jsx │ │ │ ├── Detail.jsx │ │ │ └── CreatePokemon.jsx │ │ ├── store/ │ │ │ └── PokemonStore.js │ │ ├── services/ │ │ │ └── services-api.js │ │ ├── styles/ │ │ │ ├── Home.css │ │ │ ├── Detail.css │ │ │ └── Nav.css │ │ └── App.js │ └── public/ ├── server/ (si aplica) └── README.md


## ✨ Funcionalidades principales

1. **Explorar Pokémon**:
   - Muestra una lista de Pokémon obtenidos desde una API.
   - Cada Pokémon se muestra en una tarjeta con su imagen, nombre y tipos.

2. **Ver detalles de un Pokémon**:
   - Al hacer clic en un Pokémon, se navega a una página de detalle donde se muestra información más específica, como estadísticas, altura, peso y tipos.

3. **Filtrar y ordenar Pokémon**:
   - Filtrar Pokémon por tipo.
   - Ordenar Pokémon alfabéticamente o por estadísticas como ataque o velocidad.

4. **Eliminar Pokémon creados por usuarios**:
   - Solo los Pokémon creados por usuarios pueden ser eliminados desde la página de detalle.

5. **Crear nuevos Pokémon**:
   - Formulario para crear un nuevo Pokémon y agregarlo a la lista.

6. **Indicadores de carga**:
   - Se muestran indicadores de carga mientras se obtienen los datos de la API.

## 🛠️ Configuración del proyecto

### **Requisitos previos**

- Node.js instalado en tu máquina.
- Un backend o API funcional para obtener los datos de los Pokémon.

### **Instalación**

1. Clona este repositorio:

   ```bash
   git clone https://github.com/tu-usuario/pokemon-app.git
   cd pokemon-app

2. Instala las dependencias:

npm install

3. Inicia el servidor de desarrollo:

npm start

4. Abre la aplicación en tu navegador:

Aquí tienes un ejemplo de un archivo

README.md

 basado en tu proyecto de la aplicación de Pokémon:

```markdown
# Pokémon App

¡Bienvenido a la **Pokémon App**! Este proyecto es una aplicación web que permite a los usuarios explorar una lista de Pokémon, ver detalles específicos de cada uno, filtrar y ordenar Pokémon, y eliminar aquellos creados por los usuarios.

## 🚀 Tecnologías utilizadas

Este proyecto fue desarrollado utilizando las siguientes tecnologías:

- **React**: Biblioteca de JavaScript para construir interfaces de usuario.
- **Zustand**: Librería para la gestión del estado global.
- **React Router**: Para la navegación entre páginas.
- **React Loading**: Para mostrar indicadores de carga.
- **CSS**: Para los estilos personalizados de la aplicación.
- **Fetch API**: Para realizar solicitudes HTTP a la API.
- **Node.js** (Backend): Para manejar las solicitudes de la API (si aplica).
- **API personalizada**: Para obtener y gestionar los datos de los Pokémon.

## 📂 Estructura del proyecto

```

Pokemon-App/
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Card.jsx
│   │   │   ├── Nav.jsx
│   │   │   └── Paginate.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Detail.jsx
│   │   │   └── CreatePokemon.jsx
│   │   ├── store/
│   │   │   └── PokemonStore.js
│   │   ├── services/
│   │   │   └── services-api.js
│   │   ├── styles/
│   │   │   ├── Home.css
│   │   │   ├── Detail.css
│   │   │   └── Nav.css
│   │   └── App.js
│   └── public/
├── server/ (si aplica)
└──

README.md

```

## ✨ Funcionalidades principales

1. **Explorar Pokémon**:
   - Muestra una lista de Pokémon obtenidos desde una API.
   - Cada Pokémon se muestra en una tarjeta con su imagen, nombre y tipos.

2. **Ver detalles de un Pokémon**:
   - Al hacer clic en un Pokémon, se navega a una página de detalle donde se muestra información más específica, como estadísticas, altura, peso y tipos.

3. **Filtrar y ordenar Pokémon**:
   - Filtrar Pokémon por tipo.
   - Ordenar Pokémon alfabéticamente o por estadísticas como ataque o velocidad.

4. **Eliminar Pokémon creados por usuarios**:
   - Solo los Pokémon creados por usuarios pueden ser eliminados desde la página de detalle.

5. **Crear nuevos Pokémon**:
   - Formulario para crear un nuevo Pokémon y agregarlo a la lista.

6. **Indicadores de carga**:
   - Se muestran indicadores de carga mientras se obtienen los datos de la API.

## 🛠️ Configuración del proyecto

### **Requisitos previos**
- Node.js instalado en tu máquina.
- Un backend o API funcional para obtener los datos de los Pokémon.

### **Instalación**

1. Clona este repositorio:
   ```bash
   git clone https://github.com/tu-usuario/pokemon-app.git
   cd pokemon-app
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Inicia el servidor de desarrollo:

   ```bash
   npm start
   ```

4. Abre la aplicación en tu navegador:

   http://localhost:3000

## 📄 Archivos clave

### **`PokemonStore.js`**

- Maneja el estado global de la aplicación utilizando Zustand.
- Funciones principales:
  - `fetchPokemons`: Obtiene la lista de Pokémon desde la API.
  - `fetchPokemonById`: Obtiene los detalles de un Pokémon específico.
  - `deletePokemon`: Elimina un Pokémon creado por el usuario.
  - `filterPokemonByType`: Filtra Pokémon por tipo.
  - `orderPokemonsByName`: Ordena Pokémon alfabéticamente.
  - `orderPokemonsByStrength`: Ordena Pokémon por estadísticas.

### **`Detail.jsx`**

- Página de detalle de un Pokémon.
- Muestra información específica del Pokémon seleccionado.
- Permite eliminar Pokémon creados por usuarios.

### **`Home.jsx`**

- Página principal que muestra la lista de Pokémon.
- Incluye opciones para filtrar y ordenar Pokémon.

### **`services-api.js`**

- Contiene las funciones para interactuar con la API.
- Ejemplo:

  ```javascript
  const ApiService = {
    getAllPokemon: async () => {
      const response = await fetch("http://localhost:5000/api/pokemons");
      return response.json();
    },
    getPokemonById: async (id) => {
      const response = await fetch(`http://localhost:5000/api/pokemons/${id}`);
      return response.json();
    },
    deletePokemon: async (id) => {
      await fetch(`http://localhost:5000/api/pokemons/${id}`, { method: "DELETE" });
    },
  };
  ```

## 🛡️ Licencia

Este proyecto está bajo la licencia MIT. Puedes usarlo, modificarlo y distribuirlo libremente.

---

¡Gracias por explorar la **Pokémon App**! Si tienes alguna pregunta o sugerencia, no dudes en abrir un issue o contribuir al proyecto.

```
