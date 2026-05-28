# 🏭 Magazzino Molinaro ESCo

WebApp per la gestione del magazzino aziendale — **Molinaro ESCo Energy Service Company**.

## Funzionalità

- 📦 Inventario materiali suddiviso per categorie con codici prodotto
- ➕ Aggiunta e rimozione materiali con tracciamento operatore
- 📊 Dashboard con diagramma ad albero e statistiche in tempo reale
- 📱 QR code per ogni prodotto — scansionabile da mobile
- 📋 Registro movimentazioni con possibilità di annullare operazioni
- 👷 Accesso per operai (prelievo/reimmissione materiali)
- 🔒 Accesso responsabile (report Excel, gestione categorie, svuota registro)
- ☁️ Sincronizzazione in tempo reale via Firebase Firestore
- 🔐 Autenticazione Firebase (email + password)

## Struttura del progetto

```
magazzino-molinaro/
├── index.html          — Pagina di login
├── app.html            — WebApp principale (richiede login)
├── firebase.js         — Configurazione Firebase
├── logo-molinaro.png   — Logo aziendale (da aggiungere)
├── .gitignore
└── README.md
```

## Tecnologie

- HTML5 + CSS3 + JavaScript (ES Modules)
- Firebase Authentication
- Cloud Firestore (database real-time)
- GitHub Pages (hosting)

## Come pubblicare su GitHub Pages

1. Crea un repository su GitHub (privato)
2. Carica tutti i file
3. Vai su **Settings → Pages → Branch: main → / (root)**
4. L'app sarà online su `https://tuoutente.github.io/magazzino-molinaro`

## Utenti

Gli utenti sono gestiti tramite Firebase Authentication e i loro ruoli
(`responsabile` / `operaio`) sono salvati nella collezione `utenti` di Firestore.

---

*Molinaro ESCo · WebApp Magazzino*
