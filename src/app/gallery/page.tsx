// 'use client';

// import { useState } from 'react';

// const videos = [
//   {
//     id: 1,
//     year: 2024,
//     title: 'CIO Choice 2024',
//     videoUrl: 'https://www.youtube.com/embed/CDEBPnmwRzk',
//   },
//   {
//     id: 2,
//     year: 2023,
//     title: 'CIO Choice 2023',
//     videoUrl: 'https://www.youtube.com/embed/68RvEJU-36M',
//   },
// ];

// export default function VideoGalleryPage() {
//   const [activeVideo, setActiveVideo] = useState<number | null>(null);

//   return (
//     <main className="video-gallery-page">
//       <section className="video-gallery-section">
//         <div className="video-gallery-container">
//           <div className="video-gallery-heading">
//             <span className="video-gallery-label11">VIDEO GALLERY</span>

//             <h1>VIDEO GALLERY</h1>

//             <p>
//               Explore memorable moments, recognition highlights and brand stories from CIO Choice
//               over the years.
//             </p>
//           </div>

//           <div className="video-gallery-grid">
//             {videos.map((video) => (
//               <article key={video.id} className="video-gallery-card">
//                 <div className="video-gallery-frame">
//                   <iframe
//                     src={
//                       activeVideo === video.id
//                         ? `${video.videoUrl}?autoplay=1&rel=0`
//                         : `${video.videoUrl}?rel=0`
//                     }
//                     title={video.title}
//                     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                     allowFullScreen
//                     style={{
//                       border: 0,
//                       width: '100%',
//                       height: '100%',
//                     }}
//                   />

//                   {activeVideo !== video.id && (
//                     <button
//                       type="button"
//                       className="video-play-overlay"
//                       onClick={() => setActiveVideo(video.id)}
//                     >
//                       <span className="video-play-button">▶</span>
//                     </button>
//                   )}
//                 </div>

//                 <div className="video-gallery-content">
//                   <h3>{video.title}</h3>
//                   <p>Recognition highlights and event moments from {video.title}.</p>
//                 </div>
//               </article>
//             ))}
//           </div>
//         </div>
//       </section>
//     </main>
//   );
// }

'use client';

import { useState } from 'react';

const videos = [
  {
    id: 1,
    year: 2024,
    title: 'CXO Unfiltered 2024',
    videoUrl: 'https://www.youtube.com/embed/CDEBPnmwRzk',
  },
  {
    id: 2,
    year: 2023,
    title: 'CXO Unfiltered 2023',
    videoUrl: 'https://www.youtube.com/embed/68RvEJU-36M',
  },
];

export default function VideoGalleryPage() {
  const [activeVideo, setActiveVideo] = useState<number | null>(null);

  return (
    <main className="video-gallery-page">
      <section className="video-gallery-section">
        <div className="video-gallery-container">
          <div className="video-gallery-heading">
            <span className="video-gallery-label11">Executive Chronicles</span>

            <h1>CXO UNFILTERED</h1>

            <p>
              Unraveling the personal journeys behind the decisions and lives of influential
              business leaders and CXOs.
            </p>
          </div>

          <div className="video-gallery-grid">
            {videos.map((video) => (
              <article key={video.id} className="video-gallery-card">
                <div className="video-gallery-frame">
                  <iframe
                    src={
                      activeVideo === video.id
                        ? `${video.videoUrl}?autoplay=1&rel=0`
                        : `${video.videoUrl}?rel=0`
                    }
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    style={{
                      border: 0,
                      width: '100%',
                      height: '100%',
                    }}
                  />

                  {activeVideo !== video.id && (
                    <button
                      type="button"
                      className="video-play-overlay"
                      onClick={() => setActiveVideo(video.id)}
                      aria-label={`Play ${video.title}`}
                    >
                      <span className="video-play-button">▶</span>
                    </button>
                  )}
                </div>

                <div className="video-gallery-content">
                  <h3>{video.title}</h3>
                  <p>
                    Candid conversations, leadership lessons and personal stories from influential
                    CXOs and business leaders.
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
