# Correction de la Redirect URI Google OAuth

## Problème identifié
Google OAuth redirige vers `http://localhost:3000/api/auth/callback/google` au lieu de `http://localhost:8000/api/auth/callback/google`.

## Cause
La configuration dans Google Cloud Console utilise encore l'ancienne URL avec le port 3000.

## Solution

### 1. Accéder à Google Cloud Console
- Allez sur : https://console.cloud.google.com/
- Sélectionnez votre projet

### 2. Accéder aux identifiants OAuth
- Dans le menu de gauche : "APIs & Services" > "Credentials"
- Trouvez votre "OAuth 2.0 Client ID" pour l'application web

### 3. Modifier les URIs de redirection autorisées
- Cliquez sur l'ID client OAuth
- Dans la section "Authorized redirect URIs" :
  - **Supprimez** : `http://localhost:3000/api/auth/callback/google`
  - **Ajoutez** : `http://localhost:8000/api/auth/callback/google`

### 4. Enregistrer les modifications
- Cliquez sur "Save" en bas de la page

## Vérification
Après avoir modifié la configuration Google :
1. Redémarrez votre serveur backend
2. Essayez de vous connecter avec Google
3. La redirection devrait maintenant aller vers `http://localhost:8000/api/auth/callback/google`

## Configuration actuelle (correcte)
- Backend : `http://localhost:8000`
- Frontend : `http://localhost:5173` (Vite dev server)
- Better Auth baseURL : `http://localhost:8000`
- Google redirectURI : `http://localhost:8000/api/auth/callback/google`