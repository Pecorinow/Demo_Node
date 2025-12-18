//! 1) Création du serveur
//? 1) Import du module http pour créer le serveur
// On crée une constante dans laquelle on va stocker le module importé http (on va l'appeler http)
// Pour importer le module, si on est en commonjs, on doit écrire require('nomDuModule') :
const http = require('http');

//? 2) Création du serveur :
//On crée une constante où stocker le serveur créé :
const server = http.createServer((req, res) => {
    // req = objet contenant des infos sur la requête qui arrive sur le serveur
    // res = objet qui représente la réponse que va renvoyer le serveur
    console.log(`URL : ${req.url}`); // = affiche l'URL de la req^te e qui vient d'arriver
    console.log(`METHOD : ${req.method}`); // = affiche la méthode de la requête qu vient d'arriver
    // Actuellement, à chaque fois qu'on modifie le contenue du fichier, on doit arrêter le serveur et le relancer avec npm start. À la rentrée, on verra comment éviter ça.
});

//! 2) Écouter le serveur = le rendre dispo sur un port spécifique de notre machine pour qu'il soit lancé en local
// server.listen(PORT, fonction)
// Port = port en local sur notre machine sur lequel sera le serveur
// Fonction = 
server.listen(8080, ()=> {
    console.log('Server started on Port 8080 !')
}); // On évite d'utiliser les ports dan les 1000, souvent on utilise 4000 pour le front, et 8000 ou 3000 pour le back. Ici, on va juste éviter d'utiliser un port utilisé pour autre chose, le 8080.

// Attention : là on a juste créé le serveur, on intercepte pas encore les requêtes qui pasent ! Pour ça, on ajoute req et res dans la fonction createServeur (voir plus haut).