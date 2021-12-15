import { FacebookShareButton, FacebookIcon } from "react-share"

export default function SharePost() {

    const shareButton = document.querySelector('')
    const overlay = document.querySelector('.overlay')
    const shareModal = document.querySelector('.share')

    const title = window.document.title
    const url = window.document.location.href

    shareButton.addEventListener('click', () => {
        if (navigator.share) {
            navigator.share({
                title: `${title}`,
                url: `${url}`
            }).then(() => {
                console.log('Thanks for sharing!')
            }).catch(console.error)
        } else {
            overlay.classList.add('show-share')
            shareModal.classList.add('show-share')
        }
    })

    overlay.addEventListener('click', () =>{
        overlay.classList.remove('show-share')
    })


    return (
        <>

            {/* Box icons cdn for social media icons */}
            <link rel="stylesheet" href="https://unpkg.com/boxicons@2.0.7/css/boxicons.min.css" />

            <div className="container w-2/3 mt-4 m-auto">
                <div className="overlay absolute opacity-30 w-screen h-screen z-0 bg-gray-400" id={overlay}></div>
                <div className="share absolute w-2/4 z-10 mt-4 m-auto p-1 bg-white" id={share}>

                    <h2 className="text-indigo-800 text-base">Share My Post</h2>
                    <button
                        className="px-3 text-lg font-bold text-white bg-indigo-800 rounded-md" id={meta}
                    >Meta <i class='bx bxl-meta'></i></button>

                    <button
                        className="px-3 text-lg font-bold text-white bg-indigo-800 rounded-md" id={twitter}
                    >Twitter<i class='bx bxl-twitter'></i></button>

                    <button
                        className="px-3 text-lg font-bold text-white bg-rose-800 rounded-md" id={whatsapp}
                    >WhatsApp<i class='bx bxl-whatsapp'></i></button>

                </div>
            </div>
        </>
    )
}