export const generateUniqueCode = (length: number = 6): string => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < length; i++) {
        code += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return code;
};

// Exemple d'utilisation :
export const generateExpiringCode = (durationInMinutes: number = 5) => {
    const code = generateUniqueCode();
    const expirationTime = Date.now() + durationInMinutes * 60 * 1000;
    return { code, expiresAt: expirationTime };
};
