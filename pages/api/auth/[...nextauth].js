import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

export default NextAuth({
    providers: [
        Providers.Google({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
        }),
    ],
    callbacks: {
        session: async (session, user) => {
            session.id = user.id;
            return Promise.resolve(session);
        },
        async signIn(user, account, profile) {
            if (account.provider === "google" && profile.verified_email === true) {
                return true;
            } else {
                return false;
            }
        },
    },
});