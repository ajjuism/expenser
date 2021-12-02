import type { NextPage } from 'next';
import { Key, useEffect, useReducer } from 'react';
import Head from 'next/head';
import store,{ useStore } from '../../store';
import styles from '../../styles/Home.module.css'
import { useRouter } from 'next/router';
import axios from 'axios';

type FirebaseList = {
    projectId: String,
    displayName: String,
    name: String,
    state: String
}

const initialState = {
    isLoading: true,
    firebaseProjectList: []
}

const reducer = (
    state: {
        isLoading: Boolean,
        firebaseProjectList: Array<FirebaseList>
    },
    action: { type: String, value: any }
) => {
    switch (action.type) {
        case 'set_loading': {
            return { ...state, isLoading: action.value }
        }
        case 'set_data': {
            return { ...state, firebaseProjectList: action.value }
        }
        default:
            return state;
    }
}

const ListProject = (
    {
        projectList,
        onClick = () => { }
    }: { projectList: Array<FirebaseList>, onClick: Function }
): Array<JSX.Element> => {
    return projectList.map((list: FirebaseList, index: Key) => {
        return (
            <button
                className={styles.card}
                key={index}
                onClick={() => {
                    onClick(list.projectId)
                }}
            >
                <h2> {list.displayName} &rarr;</h2>
                <p className={styles.code}>{list.projectId}</p>
                <span className="text-sm">{list.state}</span>
            </button>
        )
    })
}

const ListPage: NextPage = () => {
    const { userDetails = {}, accessToken } = useStore();
    const [state, dispatch] = useReducer(reducer, initialState);

    const { isLoading, firebaseProjectList } = state;

    const setLoading = (value: Boolean) => {
        dispatch({ type: 'set_loading', value })
    }
    const setData = (value: Array<any>) => {
        dispatch({ type: 'set_data', value });
    }
    const router = useRouter();
    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await axios.post('/api/firebase-list', { accessToken }, {
                headers: {
                    "Content-Type": "application/json",
                }
            })
            if (response.data && response.data.status && response.data.data) {
                setData(response.data.data);
            }
        } catch (error) {
            console.error(error);
        }
        finally {
            setLoading(false);
        }
    }
    const onClickProject =(projectId:String)=>{
        store.setFirebaseProjectId(projectId);
        router.push('/dashboard')
    }
    useEffect(() => {
        if (!accessToken) {
            router.push('/login')
        } else {
            fetchData();
        }
    }, [accessToken])
    return (
        <div className={styles.container}>
            <Head>
                <title>Choose Firebase Project</title>
                <meta name="description" content="Generated by create next app" />
                {/* <link rel="icon" href="/favicon.ico" /> */}
            </Head>

            <main className={styles.main}>
                <h1 className={styles.title}>
                    Welcome to Expenser
                </h1>

                <p className={styles.description}>
                    <code className={styles.code}>Choose your firebase project</code>
                </p>
                {isLoading && (
                    <div>
                        Loading...
                    </div>)}

                {!isLoading && firebaseProjectList && (
                    <div className={styles.grid}>
                        <ListProject projectList={firebaseProjectList} onClick={onClickProject}/>
                    </div>
                )}
            </main>
        </div>
    )
}

export default ListPage
