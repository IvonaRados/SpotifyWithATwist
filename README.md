### Project Overview

This project is a web application designed for music streaming and community engagement. Users can listen to songs, create and save playlists, follow new artists, and support emerging musicians by sharing their own music with the community. The platform is moderated by an administrator to ensure content appropriateness and a safe environment. This app prioritizes ease of use, allowing users to enjoy music, create content, and become active members of the music community.

### Technologies Used

**Backend Technologies**

 - The backend uses Node.js with Express.js for setting up HTTP request handling, routing, and connecting with MongoDB. Express handles API routes for operations   like retrieving user playlists and song data, with asynchronous capabilities that streamline API calls, especially with large datasets like user playlists.

 - MongoDB offers flexible document-oriented storage, ideal for managing complex music-related data structures, such as user preferences and favorite songs. Collections like Users, Composers, Playlists, Songs, and News allow adaptable data handling and seamless updates as new features are added.

 - Backend models represent different data entities (e.g., Users, Songs, Playlists) and include validation rules, data indexing, and CRUD functionality for efficient playlist and song management, directly linked to MongoDB collections for optimized storage and retrieval.

 - Controllers manage business logic between MongoDB models and routes, handling specific operations such as adding composers, fetching favorites, or sharing playlists. This allows centralized control for updates or maintenance, supporting complex data interactions like combining user playlists and composer data.

 - Routing and API Endpoints. Where routes define various user actions, such as viewing, adding, and updating playlist and song data in MongoDB. Dynamic parameters enable targeted database queries, creating an interactive backend API for client-server communication.

 - The index.js file configures the server, initiates MongoDB connections using Mongoose, and handles server monitoring. This structure enables streamlined development workflows, facilitating issue tracking with database connections or API requests.

**Frontend Technologies**

 - React components are structured for modularity and reusability, with elements like song cards, playlists, and navigation menus enhancing the user interface across pages. Components are organized under:

   - Pages: Main sections like Discover and Favorites.
   - Components: Reusable UI elements such as search fields, music players, and dropdowns.
   - Assets: Static resources like icons and styles.
     
 - Redux manages global states, synchronizing song and playlist data across components. Actions like setActiveSong and nextSong keep playback consistent and allow multi-step processes such as switching playlists, with a centralized data source.

 - The ShazamCoreAPI provides real-time song metadata, genres, and playback links. The API is configured with secure authentication headers and serves multiple endpoints for fetching top charts, genres, and personalized music recommendations, enhancing user discovery.

 - The frontend directory follows a clear hierarchy for efficient navigation, with main directories:

   - Pages: Represents full-page components like Discover and Favorites.
   - Components: Houses reusable UI elements.
   - Redux: Contains actions, reducers, and the central store for managing application-wide states.

     
 - App.js is the entry point, managing routing between pages and rendering the main music player when active. By monitoring Redux states, it allows conditional rendering, providing a cohesive interface where page navigation and API integration converge.

### Database & Architecture

- **Database**:  
  The database architecture leverages MongoDB collections, allowing seamless data management and flexibility to adapt to the application’s evolving data needs.
  
- **Architecture**:  
  The application is structured with a **backend (server)** that connects to the database and a **frontend (client)** that interacts with users. The architecture is modular, making it easy to scale and maintain.





### The layout of some SpotifyApp pages:

- The layout of the main homepage (as a guest)
   https://imgur.com/gUpgf1O

- User Page - Favorites Section
   https://imgur.com/PXf2itM

- The login page
   https://imgur.com/1IxrBUL
  
- The layout of the music player
   https://imgur.com/55Ovyoc

- Register Page for New Artists
   https://imgur.com/8yaFd2B

- Layout of the TopCharts feature
   https://imgur.com/dIImRnW
  
- Artist Homepage
   https://imgur.com/boB2xGu

