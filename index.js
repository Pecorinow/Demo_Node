const trainers = [
    { id : 1, firstname : 'Aude', lastname : 'Beurivé'},
    { id : 2, firstname : 'Aurélien', lastname : 'Strimelle'},
    { id : 3, firstname : 'Quentin', lastname : 'Geerts'}
]


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
    const URL = req.url;
    const METHOD = req.method;

    // Dans le cas où on accède à localhost:8080 en get :
    if(URL === '/' && METHOD === 'GET') {
        // On va mettre en place la réponse à renvoyer dans ce cas-là :
        // On va envoyer un code pour indiquer que la req est un succès  (ou une erreur, mais mnt on va mettre succès) :
        res.writeHead(200); // 200 = ok, tout s'est bien passé

        // Ensuite, on va mettre fin  à la requête et envoyer du contenu (texte, html, json, fichier...) :
        res.end(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Formation - Accueil</title>
                <style>
                    h1 {
                        color : tomato;
                    }
                </style>
            </head>
            <body>
                <h1>Bienvenue à la formation Web Dev Full Stack de I3</h1>
                <h2>Nous sommes le ${new Date().toLocaleDateString('fr-BE')} </h2>
                <a href="/trainers">Cliquez ici pour découvrir la liste des formateurs</a>
            </body>
            </html>
        `); // Donc, quand on remplira la condition du if, on aura une réponse 200 avec le res.end !
    } else if(URL === '/trainers' && METHOD === 'GET'){
        res.writeHead(200);
        res.end(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Formation - Liste Formateurs</title>
            </head>
            <body>
                <h1>Voici la liste des formateurs</h1>
                <a href="/">Cliquez ici pour revenir à la page d'accueil</a>

                <ul>
                    <!-- utilisation d'un reducer pour transformer le tableau en une seule chaine de caractère contenant le html -->
                    ${trainers.reduce((lesLi, trainer) => lesLi + `<li>${trainer.firstname} ${trainer.lastname}</li>` , '')}
                </ul>
            </body>
            </html>
        `);
    } else {
        res.writeHead(200);
        res.end(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Formation - Liste Formateurs</title>
            </head>
            <body>
                <h1>404 Not Found</h1>
                <h2>La page que vous recherchez n'est pas disponible</h2>
                <img src="https://static.vecteezy.com/system/resources/thumbnails/024/405/934/small/icon-tech-error-404-icon-isolated-png.png" alt="404 not found">
            </body>
            </html>
        `)
    }

    //* Actuellement, à chaque fois qu'on modifie le contenue du fichier, on doit arrêter le serveur et le relancer avec npm start. À la rentrée, on verra comment éviter ça.
});

//! 2) Écouter le serveur = le rendre dispo sur un port spécifique de notre machine pour qu'il soit lancé en local
// server.listen(PORT, fonction)
// Port = port en local sur notre machine sur lequel sera le serveur
// Fonction = 
server.listen(8080 || 3000, ()=> {
    console.log('Server started on Port 8080 !')
}); // On évite d'utiliser les ports dan les 1000, souvent on utilise 4000 pour le front, et 8000 ou 3000 pour le back. Ici, on va juste éviter d'utiliser un port utilisé pour autre chose, le 8080.

// Attention : là on a juste créé le serveur, on intercepte pas encore les requêtes qui pasent ! Pour ça, on ajoute req et res dans la fonction createServeur (voir plus haut).