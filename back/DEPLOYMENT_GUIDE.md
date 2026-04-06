# Guide de Déploiement - Better Auth

## Problèmes identifiés et solutions

### 1. Dépendance manquante en production
**Problème** : Better Auth était dans `devDependencies`, donc non installé en production.

**Solution** : ✅ Déplacé vers `dependencies` dans `package.json`.

### 2. RedirectURI hardcodée
**Problème** : Google OAuth redirigeait toujours vers `localhost:8000`.

**Solution** : ✅ Rendu dynamique selon l'environnement :
```typescript
redirectURI: `${baseURL}/api/auth/callback/google`
```

### 3. baseURL non configurée
**Problème** : `BETTER_AUTH_URL` pouvait être undefined.

**Solution** : ✅ Valeur par défaut selon l'environnement.

## Configuration requise pour le déploiement

### Variables d'environnement
```bash
# URL de votre application déployée
BETTER_AUTH_URL=https://votre-domaine.com

# Base de données PostgreSQL
DATABASE_URL=postgresql://...

# OAuth Providers
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
GITHUB_CLIENT_ID=...
GITHUB_CLIENT_SECRET=...
```

### Configuration OAuth Google
1. Allez sur [Google Cloud Console](https://console.cloud.google.com/)
2. Créez/éditez votre projet OAuth
3. Dans "Authorized redirect URIs", ajoutez :
   - Développement : `http://localhost:8000/api/auth/callback/google`
   - Production : `https://votre-domaine.com/api/auth/callback/google`

### Configuration OAuth GitHub
1. Allez dans Settings > Developer settings > OAuth Apps
2. Créez/éditez votre application
3. Dans "Authorization callback URL", mettez :
   - `https://votre-domaine.com/api/auth/callback/github`

## Vérifications post-déploiement

### 1. Test de connexion
```bash
curl -X GET https://votre-domaine.com/api/auth/get-session
```

### 2. Test OAuth Google
- Visitez : `https://votre-domaine.com/api/auth/sign-in/google`
- Vérifiez que la redirection fonctionne

### 3. Logs serveur
Vérifiez les logs pour :
- "Better Auth initialized successfully"
- Erreurs de configuration OAuth
- Problèmes de base de données

## Commandes de déploiement

```bash
# Installation des dépendances (incluant better-auth)
npm install

# Build de l'application
npm run build

# Démarrage en production
npm start
```

## Dépannage

### Erreur "Invalid redirect URI"
- Vérifiez que l'URI dans Google Console correspond exactement à `baseURL + /api/auth/callback/google`

### Erreur "CORS error"
- Vérifiez que votre domaine est dans `trustedOrigins`
- Assurez-vous que `credentials: true` est activé côté frontend

### Erreur "Database connection failed"
- Vérifiez la variable `DATABASE_URL`
- Assurez-vous que la base de données est accessible depuis votre serveur déployé

### Cookies non persistants
- En production, `sameSite: "none"` et `secure: true` sont requis
- Vérifiez que votre domaine supporte HTTPS