import { HiOutlineHashtag, HiOutlineHome, HiOutlinePhotograph, HiOutlineUserGroup, HiHeart, HiLogin, HiLogout, HiUser,
HiMusicNote, HiNewspaper, HiMicrophone, HiUserCircle, HiUserGroup, HiThumbUp, HiThumbDown, HiOutlineNewspaper,
HiPlusCircle, HiUsers, HiOutlineUser } from 'react-icons/hi';
import { BsMusicNote } from 'react-icons/bs';
import { FaUsers } from 'react-icons/fa';

export const genres = [
  { title: 'Pop', value: 'POP' },
  { title: 'Hip-Hop', value: 'HIP_HOP_RAP' },
  { title: 'Dance', value: 'DANCE' },
  { title: 'Electronic', value: 'ELECTRONIC' },
  { title: 'Soul', value: 'SOUL_RNB' },
  { title: 'Alternative', value: 'ALTERNATIVE' },
  { title: 'Rock', value: 'ROCK' },
  { title: 'Latin', value: 'LATIN' },
  { title: 'Film', value: 'FILM_TV' },
  { title: 'Country', value: 'COUNTRY' },
  { title: 'Worldwide', value: 'WORLDWIDE' },
  { title: 'Reggae', value: 'REGGAE_DANCE_HALL' },
  { title: 'House', value: 'HOUSE' },
  { title: 'K-Pop', value: 'K_POP' },
];

export const links = [
  { name: 'Discover', to: '/Discover', icon: HiOutlineHome },
  { name: 'Around You', to: '/around-you', icon: HiOutlinePhotograph },
  { name: 'Top Artists', to: '/top-artists', icon: HiOutlineUserGroup },
  { name: 'Top Charts', to: '/top-charts', icon: HiOutlineHashtag },
  { name: 'Logout', to: '/logout', icon: HiOutlineHashtag },
  { name: 'Favorites', to: '/favorites', icon: HiOutlineHashtag },

];

export const linksLoginRegister = [
  { name: 'User', to: '/user-lr', icon: HiUser },
  { name: 'Artist', to: '/composer-lr', icon: HiMicrophone },
  { name: 'Admin', to: '/adminLogin', icon: HiOutlineUser },

  

];

export const linksUser = [
  { name: 'Discover', to: '/Discover', icon: HiOutlineHome },
  { name: 'Favorites', to: '/favorites', icon: HiHeart },
  { name: 'My Playlists', to: '/myPlaylists', icon: HiNewspaper },
  { name: 'Discover New Artists', to: '/newArtists', icon: HiMusicNote },
  { name: 'Songs from New Artists', to: '/allNewSongs', icon: BsMusicNote },
  { name: 'Following', to: '/following', icon: HiUsers },
  { name: 'Public Playlists', to: '/allPlaylists', icon: HiOutlineUserGroup },
  { name: 'All Users', to: '/allUsers', icon: FaUsers },
  { name: 'Logout', to: '/logout', icon: HiLogout },

];

export const linksArtist = [
  { name: 'Home', to: '/homepageComposer', icon: HiOutlineHome },
  { name: 'Add Song', to: '/addNewSong', icon: HiPlusCircle },
  { name: 'Add News', to: '/AddNewNews', icon: HiPlusCircle },
  { name: 'Logout', to: '/logout', icon: HiLogout },

];

export const linksAdmin = [
  { name: 'Home', to: '/adminPage', icon: HiOutlineHome },
  { name: 'Songs', to: '/adminSongsPage', icon: HiMusicNote },
  { name: 'Artists', to: '/adminArtistPage', icon: HiMicrophone },
  { name: 'News', to: '/adminNewsPage', icon: HiOutlineNewspaper },
  { name: 'Logout', to: '/logout', icon: HiLogout },

];

