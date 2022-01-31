import React, {useEffect, useMemo, useState} from "react"
import VoxeetSDK from "@voxeet/voxeet-web-sdk";

export const Dolby: React.FC = () => {

    const [joined, setJoined] = useState(false)
    const [userId] = useState(() => `userId-${Math.random()}`)

    useEffect(() => {

        const connect = async () => {

            console.log('initializing...')
            VoxeetSDK.initialize(process.env.REACT_APP_DOLBY_KEY as string, process.env.REACT_APP_DOLBY_SECRET as string)
            console.log('initialized...')

            console.log('opening session...')
            try {
                await VoxeetSDK.session.open({ externalId: userId })
                console.log('session opened')
            } catch (error) {
                console.warn('session failed to open')
                console.error(error)
            }

            console.log('creating conference...')
            VoxeetSDK.conference.create({ alias: 'dolby-integration-demo-test', params: {
                dolbyVoice: true,
            }})
                .then((conference) => {
                    console.log('created conference...')
                    return VoxeetSDK.conference.join(conference, {
                        spatialAudio: true
                    })
                })
                .then(() => {
                    console.log('joined conference...')
                    setJoined(true)
                })
                .catch((err) => {
                    console.warn('SOMETHING WENT WRONG!!!!!!')
                    console.error(err)
                });

        }

        connect()




    }, [])

    return (
        <>
            <div>
                DOLBY INTEGRATION...
            </div>
            {
                joined && (
                    <div>
                        <div>JOINED...</div>
                    </div>
                )
            }
        </>
    )
}
