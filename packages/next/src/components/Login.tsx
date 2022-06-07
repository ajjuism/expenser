import Image from 'next/image';
import { useState } from 'react';
import { getFirebaseConfig, Logger, FirebaseConfigType } from '../helper';
import { getApp, initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import tag from '../config/tag.json';
import axios from 'axios';

const Login = () => {
    const [isLoading, setLoading] = useState(false);
    const onClickLogin = async () => {
        setLoading(true);
        try {
            let app;
            const config: FirebaseConfigType = getFirebaseConfig();
            const firebaseConfigureJson = {
                apiKey: config.FIREBASE_API_KEY,
                authDomain: config.FIREBASE_AUTH_DOMAIN,
                projectId: config.PROJECT_ID,
                storageBucket: config.STORAGE_BUCKET,
                messagingSenderId: config.MESSAGING_SENDER_ID,
                appId: config.APP_ID,
            };
            try {
                const firebaseApps = getApp(tag.firebaseTag);
                app = firebaseApps;
            } catch (error) {
                app = initializeApp(firebaseConfigureJson, tag.firebaseTag);
            }
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);
            const data: any = await signInWithPopup(auth, provider);
            const { accessToken } = (data && data.user) || {};
            console.log(accessToken);
            const result = await axios.post('/api/v1/user/login', {
                accessToken
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            console.log(result);
        } catch (error) {
            Logger.error(error);
        }
        setLoading(false)
    }
    return (<div>
        <button
            className="flex items-center justify-center px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full"
            disabled={isLoading}
            onClick={onClickLogin}>
            <Image
                src="/images/google-logo.png"
                alt="logo"
                width={20}
                height={20}
            />
            {isLoading && (<span className="ml-2 text-lg">Loading...</span>)}
            {!isLoading && (<span className="ml-2 text-lg">Login with Google</span>)}
        </button>
    </div>)
}

export default Login;