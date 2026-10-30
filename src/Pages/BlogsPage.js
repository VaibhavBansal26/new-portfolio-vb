import React from 'react';
import styled from 'styled-components';
import { motion, useReducedMotion } from 'framer-motion';
import usePageTitle from '../hooks/usePageTitle';
import ArrowOutwardRoundedIcon from '@mui/icons-material/ArrowOutwardRounded';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import YouTubeIcon from '@mui/icons-material/YouTube';
import TerminalRoundedIcon from '@mui/icons-material/TerminalRounded';
import PsychologyRoundedIcon from '@mui/icons-material/PsychologyRounded';
import WebRoundedIcon from '@mui/icons-material/WebRounded';
import AutoStoriesRoundedIcon from '@mui/icons-material/AutoStoriesRounded';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import writingDoodles from '../img/writing-ai-doodles.webp';
import { useLatestCreatorContent } from '../hooks/useLiveData';

const articles = [
  {
    no: '01',
    type: 'AI tooling · latest',
    title: 'I Built a CLI That Turns One Sentence Into a Website—and Refuses to Ship Your API Keys',
    summary: 'The architecture and safety decisions behind a multi-page website generator, visual editor, secret scanning, and one-command deployment.',
    tags: ['Promptsite', 'Developer tools', 'AI safety'],
    link: 'https://medium.com/@vaibhav.bansal945/ai-website-generator-cli-blocks-leaked-api-keys-e5f19ebbac62',
    Icon: TerminalRoundedIcon,
    tone: 'violet',
    aside: 'Build → audit → ship',
  },
  {
    no: '02',
    type: 'Applied AI · 3 min read',
    title: 'Build a Minimal RAG Pipeline in 50 Lines of Python',
    summary: 'Chunk, index, retrieve, and assemble grounded prompts with one dependency, zero API keys, and no framework hiding the important ideas.',
    tags: ['Python', 'RAG', 'Retrieval'],
    link: 'https://medium.com/@vaibhav.bansal945/build-a-minimal-rag-pipeline-in-50-lines-of-python-no-framework-required-4c1d7db275b9',
    Icon: PsychologyRoundedIcon,
    tone: 'mint',
    aside: 'No framework required',
  },
  {
    no: '03',
    type: 'Web architecture · evergreen',
    title: 'CSR, SSR, ISR, and SSG: Which Rendering Method Is Right for You?',
    summary: 'A practical comparison of rendering strategies through performance, freshness, developer experience, and the needs of real users.',
    tags: ['React', 'Next.js', 'Performance'],
    link: 'https://medium.com/@vaibhav.bansal945/exploring-csr-ssr-isr-and-ssg-which-rendering-method-is-right-for-you-6c7c20793c08',
    Icon: WebRoundedIcon,
    tone: 'coral',
    aside: 'Pick the right render',
  },
];

const topics = ['AI systems', 'Open source', 'RAG without ceremony', 'Product engineering', 'Data platforms', 'Build in public'];

const youtubeVideos = [
  { id: 'Gad5vz1Pkcc', views: 10114, eyebrow: 'Most watched · 10k views', meta: 'Capstone · machine learning · 40 min', title: 'Natural disaster prediction, from raw signals to a working system.', copy: 'A full walkthrough of the data, deep-learning models, and engineering decisions behind the disaster-intelligence project.' },
  { id: 'ZcIbqeIAC0Y', eyebrow: 'Newest · data engineering', meta: 'Kafka · Airflow · Elasticsearch · 22 min', title: 'Real-time logs, moving through a production data stack.', copy: 'Build a streaming pipeline with Kafka, schedule the workflow with Airflow, and make the result searchable in Elasticsearch.' },
  { id: '_bjaJZPFovM', eyebrow: 'MLOps build · 6 min', meta: 'Streamlit · MLflow · Docker · FastAPI', title: 'Car-price prediction with the whole MLOps toolbox.', copy: 'A compact tour through model serving, experiment tracking, containers, PostgreSQL, MinIO, and Debezium.' },
  { id: 'Z1XzofG0cNE', eyebrow: 'Full-stack + platform · 18 min', meta: 'React · Node · Kubernetes · Jenkins', title: 'A music-streaming app built as a real three-tier system.', copy: 'See the frontend, services, databases, Kubernetes deployment, and Jenkins pipeline work as one product.' },
  { id: 'VKSf1NfdjTU', eyebrow: '1.1k views · deep dive', meta: 'Azure · medallion architecture · 68 min', title: 'Designing a complete medallion architecture in Azure.', copy: 'An end-to-end data-engineering walkthrough from ingestion through transformation and serving.' },
  { id: 'ucCxmocb8W8', eyebrow: 'Cloud connection · 13 min', meta: 'Power BI · Athena · AWS EC2', title: 'Connecting Power BI to Athena from a Mac.', copy: 'A practical bridge between local analytics tooling and AWS using an EC2 instance.' },
];

const formatViews = value => new Intl.NumberFormat('en-US', { notation: Number(value) >= 1000 ? 'compact' : 'standard', maximumFractionDigits: 1 }).format(Number(value) || 0);

function BlogsPage() {
  usePageTitle('Writing');
  const reduceMotion = useReducedMotion();
  const creatorContent = useLatestCreatorContent();
  const videoRailRef = React.useRef(null);
  const liveVideos = React.useMemo(() => creatorContent.youtube.map((video, index) => ({
    ...video,
    eyebrow: index === 0 ? 'Latest upload · live feed' : 'From the channel · live feed',
    meta: video.publishedAt
      ? new Date(video.publishedAt.replace(' ', 'T')).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      : 'YouTube',
    copy: video.copy || 'The latest build note, walkthrough, or engineering experiment from Vaibhav Bansal Code.',
  })), [creatorContent.youtube]);
  const mostViewedVideo = liveVideos.reduce((leader, video) => Number(video.views || 0) > Number(leader.views || 0) ? video : leader, youtubeVideos[0]);
  const longVideos = liveVideos.filter(video => !video.isShort);
  const shortVideos = liveVideos.filter(video => video.isShort);
  const latestVideo = longVideos[0] || youtubeVideos[1] || mostViewedVideo;
  const sliderVideos = (longVideos.length ? longVideos : youtubeVideos.slice(1))
    .filter(video => video.id !== mostViewedVideo.id && video.id !== latestVideo.id);
  const moveVideoRail = direction => videoRailRef.current?.scrollBy({ left: direction * 340, behavior: reduceMotion ? 'auto' : 'smooth' });
  const displayedArticles = React.useMemo(() => {
    const feedArticles = (creatorContent.mediumPosts || []).map((post, index) => ({
      no: String(index + 1).padStart(2, '0'),
      type: `Medium · ${post.publishedAt ? new Date(post.publishedAt.replace(' ', 'T')).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'recent post'}`,
      title: post.title,
      summary: post.summary || 'A recent article from Vaibhav Bansal on Medium.',
      tags: index === 0 ? ['Medium', 'Newest', 'Live feed'] : ['Medium', 'From the archive'],
      link: post.link,
      Icon: AutoStoriesRoundedIcon,
      tone: index % 3 === 0 ? 'violet' : index % 3 === 1 ? 'mint' : 'coral',
      aside: index === 0 ? 'Newest article · automatically added' : 'From Medium',
      isLatest: index === 0,
    }));
    const source = feedArticles.length ? feedArticles : articles;
    return source.slice(0, 6).map((article, index) => ({ ...article, no: String(index + 1).padStart(2, '0') }));
  }, [creatorContent.mediumPosts]);

  return (
    <WritingStyled className="page-shell compact">
      <div className="writing-doodles" style={{ backgroundImage: `url(${writingDoodles})` }} aria-hidden="true" />
      <div className="wall-notes hand" aria-hidden="true">
        <span className="wall-note note-a">ask better<br />questions ↗</span>
        <span className="wall-note note-b">prompt → prototype</span>
        <span className="wall-note note-c">ship the useful bit</span>
      </div>
      <header className="page-hero writing-hero">
        <div>
          <p className="kicker">05 / writing &amp; watch</p>
          <h1>Build notes with<br /><span>a pulse.</span></h1>
          <p className="lead">Useful AI, developer tools, architecture, and the messy decisions between a good idea and working software.</p>
        </div>
        <motion.div
          className="publishing-dial"
          aria-label="Three articles and one featured video"
          animate={reduceMotion ? undefined : { rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        >
          <span className="mono">READ · WATCH · BUILD · REPEAT ·</span>
          <strong>3+1</strong>
        </motion.div>
      </header>

      <section className="watch-stage" aria-label="Videos from Vaibhav Bansal Code">
        <div className="video-heading">
          <div><p className="section-index">01 / watch</p><h2>Start with the one<br /><span>people watched most.</span></h2></div>
          <p className="hand">long-form first ↘</p>
        </div>

        <div className="featured-video-grid">
          <motion.article className="most-watched" initial={reduceMotion ? false : { opacity: 0, y: 28 }} whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }} viewport={{ once: true, amount: .2 }}>
            <div className="video-player">
              <iframe src={`https://www.youtube-nocookie.com/embed/${mostViewedVideo.id}`} title={mostViewedVideo.title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen />
              <span className="video-badge mono"><YouTubeIcon /> Most watched · {formatViews(mostViewedVideo.views)} views · live</span>
            </div>
            <div className="video-copy">
              <span className="mono">Audience favorite · full walkthrough</span>
              <h3>{mostViewedVideo.title}</h3>
              <p>{mostViewedVideo.copy}</p>
              <div className="video-actions"><a className="btn primary" href={`https://www.youtube.com/watch?v=${mostViewedVideo.id}`} target="_blank" rel="noreferrer"><PlayArrowRoundedIcon /> Watch on YouTube</a></div>
            </div>
          </motion.article>

          <motion.a className="latest-video-card" href={latestVideo.link || `https://www.youtube.com/watch?v=${latestVideo.id}`} target="_blank" rel="noreferrer" initial={reduceMotion ? false : { opacity: 0, x: 26, rotate: 1 }} whileInView={reduceMotion ? undefined : { opacity: 1, x: 0, rotate: 0 }} whileHover={reduceMotion ? undefined : { y: -7, rotate: -.4 }} viewport={{ once: true, amount: .2 }}>
            <span className="latest-ribbon mono">Latest full video · live feed</span>
            <div className="latest-video-art">
              <img src={`https://i.ytimg.com/vi/${latestVideo.id}/maxresdefault.jpg`} onError={event => { event.currentTarget.src = `https://i.ytimg.com/vi/${latestVideo.id}/hqdefault.jpg`; }} alt={`Thumbnail for ${latestVideo.title}`} loading="lazy" decoding="async" />
              <span className="play-disc"><PlayArrowRoundedIcon /></span>
            </div>
            <div className="latest-video-copy">
              <span className="mono">{latestVideo.meta}</span>
              <h3>{latestVideo.title}</h3>
              <p>{latestVideo.copy}</p>
              <strong className="text-link">Watch latest <ArrowOutwardRoundedIcon /></strong>
            </div>
          </motion.a>
        </div>

        <div className="video-slider" aria-label="More long-form videos">
          <div className="slider-heading"><div><span className="mono">More from the channel</span><strong>{creatorContent.isLive ? 'Automatically refreshed' : 'Selected videos'}</strong></div><div><button type="button" onClick={() => moveVideoRail(-1)} aria-label="Previous videos"><ArrowBackRoundedIcon /></button><button type="button" onClick={() => moveVideoRail(1)} aria-label="Next videos"><ArrowForwardRoundedIcon /></button></div></div>
          <div className="video-rail" ref={videoRailRef}>
            {sliderVideos.map((video, index) => (
              <a className="rail-video" href={video.link || `https://www.youtube.com/watch?v=${video.id}`} target="_blank" rel="noreferrer" key={video.id}>
                <div><img src={`https://i.ytimg.com/vi/${video.id}/mqdefault.jpg`} alt={`Thumbnail for ${video.title}`} loading="lazy" decoding="async" /><span className="mono">{String(index + 1).padStart(2, '0')}</span><PlayArrowRoundedIcon /></div>
                <p className="mono">{video.meta}</p><h3>{video.title}</h3>
              </a>
            ))}
          </div>
        </div>

        {shortVideos.length > 0 ? <div className="shorts-section" aria-label="YouTube Shorts">
          <div className="shorts-heading"><div><span className="mono">Shorts / quick ideas</span><h3>Small screen.<br />One sharp thought.</h3></div><YouTubeIcon /></div>
          <div className="shorts-rail">{shortVideos.map((video, index) => <a className="short-card" href={video.link} target="_blank" rel="noreferrer" key={video.id}><div><img src={`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`} alt={`Short: ${video.title}`} loading="lazy" decoding="async" /><span className="short-number mono">0{index + 1}</span><span className="short-play"><PlayArrowRoundedIcon /></span></div><p className="mono">Short · {video.meta}</p><h4>{video.title}</h4></a>)}</div>
        </div> : null}
      </section>

      <section className="reading-stage" aria-label="Published writing">
        <div className="reading-heading">
          <p className="section-index">02 / writing</p>
          <div className="reading-title"><AutoStoriesRoundedIcon /><div><h2>Newest first.<br /><span>Always automatic.</span></h2><p>Your next Medium post will appear in the first highlighted card here—no portfolio update needed.</p></div></div>
        </div>
        <div className="article-grid">
          {displayedArticles.map((article, index) => {
            const Icon = article.Icon;
            return <motion.a className={`article-card ${article.isLatest ? 'latest-article' : ''}`} data-tone={article.tone} href={article.link} target="_blank" rel="noreferrer" key={article.title} initial={reduceMotion ? false : { opacity: 0, y: 26 }} whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }} whileHover={reduceMotion ? undefined : { y: -8, rotate: index % 2 === 0 ? -.25 : .25 }} viewport={{ once: true, amount: .18 }} transition={{ duration: .45, delay: index * .055 }}>
              {article.isLatest && <span className="newest-flag mono">Newest from Medium · auto-added</span>}
              <span className="article-watermark" aria-hidden="true">{article.no}</span>
              <div className="article-top"><span className="article-icon"><Icon /></span><div><span className="mono">Story {article.no}</span><strong className="mono">{article.aside}</strong></div><ArrowOutwardRoundedIcon className="article-arrow" /></div>
              <p className="article-type mono">{article.type}</p><h3>{article.title}</h3><p className="article-summary">{article.summary}</p>
              <div className="article-bottom"><div className="article-tags">{article.tags.map(tag => <span className="mono" key={tag}>{tag}</span>)}</div><strong className="article-cta">Read <ArrowOutwardRoundedIcon /></strong></div>
            </motion.a>;
          })}
        </div>
      </section>

      <section className="idea-playground" aria-label="Topics I write about">
        <p className="section-index">03 / recurring obsessions</p>
        <div className="topic-cloud">
          {topics.map((topic, index) => (
            <motion.span
              className="mono"
              key={topic}
              initial={reduceMotion ? false : { opacity: 0, scale: .8, y: 14 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, scale: 1, y: 0 }}
              whileHover={reduceMotion ? undefined : { y: -6, rotate: index % 2 ? 2 : -2 }}
              viewport={{ once: true }}
              transition={{ delay: index * .055, type: 'spring', stiffness: 220, damping: 18 }}
            >
              {topic}
            </motion.span>
          ))}
        </div>
      </section>
    </WritingStyled>
  );
}

const WritingStyled = styled.div`
  position: relative;
  isolation: isolate;
  overflow: hidden;
  > header, > section { position: relative; z-index: 1; }
  .writing-doodles { position: absolute; inset: 170px -90px 0; z-index: 0; background-repeat: repeat-y; background-position: center top; background-size: 1040px auto; opacity: .105; pointer-events: none; filter: saturate(.8); }
  .wall-notes { position: absolute; inset: 0; z-index: 0; color: var(--note-accent); pointer-events: none; }
  .wall-note { position: absolute; padding: 7px 10px; background: color-mix(in srgb, var(--paper) 84%, transparent); font-size: 17px; line-height: .9; }
  .note-a { top: 830px; left: -24px; transform: rotate(-8deg); }
  .note-b { top: 1420px; right: -36px; transform: rotate(7deg); }
  .note-c { top: 2380px; left: 4%; transform: rotate(-5deg); }
  .writing-hero { display: grid; grid-template-columns: 1fr 174px; align-items: end; gap: 46px; }
  .publishing-dial { position: relative; width: 154px; height: 154px; display: grid; place-items: center; justify-self: end; border: 1px solid var(--line); border-radius: 50%; }
  .publishing-dial::before { content: ''; position: absolute; inset: 16px; border: 1px dashed var(--blue); border-radius: 50%; }
  .publishing-dial span { position: absolute; color: var(--muted); font-size: 8px; letter-spacing: .08em; }
  .publishing-dial strong { font-family: var(--display); color: var(--blue); font-size: 42px; letter-spacing: -.07em; }
  .watch-stage { padding: 72px 0 76px; border-bottom: 1px solid var(--line); }
  .video-heading { display: grid; grid-template-columns: 1fr auto; align-items: end; gap: 28px; margin-bottom: 28px; }
  .video-heading h2 { margin-top: 18px; font-family: var(--display); font-size: clamp(38px, 5vw, 68px); line-height: .91; letter-spacing: -.06em; }
  .video-heading h2 span { color: var(--blue); }
  .video-heading .hand { color: var(--note-accent); font-size: 24px; transform: rotate(-4deg); }
  .featured-video-grid { display: grid; grid-template-columns: minmax(0, 1.38fr) minmax(290px, .62fr); gap: 20px; }
  .most-watched { overflow: hidden; background: var(--paper-strong); border: 1px solid var(--soft-line); box-shadow: 0 24px 70px rgba(15,18,29,.12); }
  .video-player { position: relative; aspect-ratio: 16 / 9; overflow: hidden; background: #080b12; }
  .video-player iframe { width: 100%; height: 100%; display: block; border: 0; }
  .video-badge { position: absolute; inset: 14px auto auto 14px; display: inline-flex; align-items: center; gap: 7px; padding: 7px 9px; color: white; background: rgba(7,11,21,.76); backdrop-filter: blur(8px); font-size: 8px; text-transform: uppercase; }
  .video-badge svg { color: #ff3b30; font-size: 16px; }
  .video-copy { padding: 25px 26px 28px; }
  .video-copy > span { color: var(--blue); font-size: 8px; letter-spacing: .08em; text-transform: uppercase; }
  .video-copy h3 { margin-top: 11px; font-family: var(--display); font-size: clamp(28px, 3.4vw, 46px); line-height: .96; letter-spacing: -.05em; }
  .video-copy > p { margin-top: 16px; color: var(--muted); font-size: 13px; line-height: 1.6; }
  .video-actions { display: flex; align-items: center; gap: 20px; margin-top: 23px; }
  .video-actions .btn { width: auto; min-height: 46px; padding-inline: 19px; }
  .latest-video-card { position: relative; display: flex; min-width: 0; flex-direction: column; padding: 14px; background: color-mix(in srgb, var(--mint) 66%, var(--paper-strong)); border: 1px solid color-mix(in srgb, var(--mint-strong) 48%, var(--soft-line)); box-shadow: 10px 10px 0 color-mix(in srgb, var(--blue) 12%, transparent); }
  .latest-ribbon { align-self: flex-start; margin-bottom: 12px; padding: 7px 9px; color: var(--on-ink); background: var(--blue); font-size: 8px; letter-spacing: .08em; text-transform: uppercase; }
  .latest-video-art { position: relative; aspect-ratio: 16 / 10; overflow: hidden; background: #080b12; }
  .latest-video-art img { width: 100%; height: 100%; display: block; object-fit: cover; transition: transform .35s ease; }
  .latest-video-card:hover .latest-video-art img { transform: scale(1.045); }
  .play-disc { position: absolute; right: 14px; bottom: 14px; width: 45px; height: 45px; display: grid; place-items: center; color: white; background: #ff3b30; border-radius: 50%; box-shadow: 0 8px 24px rgba(0,0,0,.25); }
  .latest-video-copy { display: flex; flex: 1; flex-direction: column; padding: 20px 7px 8px; }
  .latest-video-copy > span { color: var(--blue); font-size: 8px; text-transform: uppercase; }
  .latest-video-copy h3 { margin-top: 9px; font-family: var(--display); font-size: clamp(24px, 2.5vw, 35px); line-height: .98; letter-spacing: -.045em; }
  .latest-video-copy p { margin-top: 12px; color: var(--muted); font-size: 12px; line-height: 1.5; }
  .latest-video-copy .text-link { margin-top: auto; padding-top: 18px; font-size: 11px; }
  .video-slider { min-width: 0; max-width: 100%; margin-top: 34px; padding-top: 22px; overflow: hidden; border-top: 1px solid var(--line); }
  .slider-heading { display: flex; align-items: center; justify-content: space-between; gap: 20px; margin-bottom: 16px; }
  .slider-heading > div:first-child { display: grid; gap: 3px; }
  .slider-heading span { color: var(--muted); font-size: 8px; text-transform: uppercase; }
  .slider-heading strong { font-family: var(--display); color: var(--blue); font-size: 18px; }
  .slider-heading > div:last-child { display: flex; gap: 7px; }
  .slider-heading button { width: 38px; height: 38px; display: grid; place-items: center; padding: 0; color: var(--blue); background: var(--paper-strong); border: 1px solid var(--soft-line); cursor: pointer; transition: color .2s ease, background .2s ease, transform .2s ease; }
  .slider-heading button:hover { color: var(--on-ink); background: var(--blue); transform: translateY(-2px); }
  .video-rail { display: grid; grid-auto-flow: column; grid-auto-columns: minmax(270px, 31%); gap: 14px; overflow-x: auto; overscroll-behavior-inline: contain; scroll-snap-type: inline mandatory; scrollbar-width: thin; padding: 0 0 12px; }
  .rail-video { min-width: 0; scroll-snap-align: start; padding: 10px 10px 16px; background: var(--paper-strong); border: 1px solid var(--soft-line); transition: transform .25s ease, border-color .25s ease, box-shadow .25s ease; }
  .rail-video:hover { transform: translateY(-5px); border-color: var(--blue); box-shadow: 0 16px 36px rgba(15,18,29,.1); }
  .rail-video > div { position: relative; aspect-ratio: 16 / 9; overflow: hidden; background: #080b12; }
  .rail-video img { width: 100%; height: 100%; display: block; object-fit: cover; }
  .rail-video > div span { position: absolute; left: 8px; top: 8px; padding: 4px 6px; color: white; background: rgba(7,11,21,.78); font-size: 8px; }
  .rail-video > div svg { position: absolute; right: 9px; bottom: 9px; color: white; filter: drop-shadow(0 2px 6px rgba(0,0,0,.5)); }
  .rail-video > p { margin-top: 13px; color: var(--blue); font-size: 7px; text-transform: uppercase; }
  .rail-video h3 { margin-top: 6px; font-family: var(--display); font-size: 18px; line-height: 1.05; letter-spacing: -.03em; }
  .shorts-section { display: grid; grid-template-columns: 220px 1fr; gap: 26px; margin-top: 34px; padding: 22px; background: color-mix(in srgb, var(--blue) 7%, var(--paper-strong)); border: 1px solid color-mix(in srgb, var(--blue) 25%, var(--soft-line)); }
  .shorts-heading { display: flex; flex-direction: column; align-items: flex-start; justify-content: space-between; }
  .shorts-heading span { color: var(--blue); font-size: 8px; text-transform: uppercase; }
  .shorts-heading h3 { margin-top: 10px; font-family: var(--display); font-size: 29px; line-height: .95; letter-spacing: -.045em; }
  .shorts-heading > svg { color: #ff3b30; font-size: 34px; }
  .shorts-rail { display: grid; grid-auto-flow: column; grid-auto-columns: minmax(145px, 1fr); gap: 12px; overflow-x: auto; scrollbar-width: thin; }
  .short-card { min-width: 0; padding: 8px 8px 13px; background: var(--paper-strong); border: 1px solid var(--soft-line); }
  .short-card > div { position: relative; aspect-ratio: 9 / 13; overflow: hidden; background: #080b12; }
  .short-card img { width: 100%; height: 100%; display: block; object-fit: cover; }
  .short-number { position: absolute; left: 8px; top: 8px; padding: 4px 6px; color: white; background: rgba(7,11,21,.78); font-size: 8px; }
  .short-play { position: absolute; right: 8px; bottom: 8px; width: 31px; height: 31px; display: grid; place-items: center; color: white; background: #ff3b30; border-radius: 50%; }
  .short-card > p { margin-top: 10px; color: var(--blue); font-size: 7px; text-transform: uppercase; }
  .short-card h4 { margin-top: 5px; font-family: var(--display); font-size: 16px; line-height: 1.05; }
  .reading-stage { padding: 72px 0 78px; border-bottom: 1px solid var(--line); }
  .reading-heading { margin-bottom: 28px; }
  .reading-title { display: grid; grid-template-columns: 54px 1fr; align-items: start; gap: 15px; margin-top: 23px; }
  .reading-title > svg { width: 48px; height: 48px; padding: 10px; color: var(--blue); background: var(--mint); transform: rotate(-5deg); }
  .reading-title h2 { font-family: var(--display); font-size: clamp(37px, 4.8vw, 65px); line-height: .91; letter-spacing: -.06em; }
  .reading-title h2 span { color: var(--blue); }
  .reading-title p { max-width: 620px; margin-top: 13px; color: var(--muted); font-size: 13px; line-height: 1.55; }
  .article-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 18px; }
  .article-card { --story-accent: var(--blue); position: relative; min-height: 330px; display: flex; flex-direction: column; padding: 25px 26px 23px; overflow: hidden; background: var(--paper-strong); border: 1px solid var(--soft-line); border-left: 6px solid var(--story-accent); box-shadow: 0 8px 0 color-mix(in srgb, var(--story-accent) 10%, transparent); transform-origin: 50% 100%; transition: border-color .25s ease, box-shadow .25s ease; }
  .article-card[data-tone='mint'] { --story-accent: var(--mint-strong); }
  .article-card[data-tone='coral'] { --story-accent: var(--amber); }
  .article-card.latest-article { grid-column: 1 / -1; min-height: 370px; padding: 34px; background: color-mix(in srgb, var(--blue) 7%, var(--paper-strong)); border-top: 7px solid var(--blue); border-left-width: 1px; }
  .newest-flag { position: absolute; right: 24px; top: 22px; z-index: 2; padding: 8px 10px; color: var(--on-ink); background: var(--blue); font-size: 8px; letter-spacing: .08em; text-transform: uppercase; }
  .article-card:hover { border-color: var(--story-accent); box-shadow: 12px 15px 0 color-mix(in srgb, var(--story-accent) 16%, transparent), 0 24px 54px rgba(15,18,29,.1); }
  .article-watermark { position: absolute; right: -12px; bottom: -48px; color: color-mix(in srgb, var(--story-accent) 10%, transparent); font-family: var(--display); font-size: 190px; font-weight: 700; line-height: 1; letter-spacing: -.12em; pointer-events: none; }
  .article-top { position: relative; z-index: 1; display: flex; align-items: center; gap: 12px; }
  .article-icon { width: 45px; height: 45px; display: grid; place-items: center; flex: 0 0 45px; color: var(--story-accent); background: color-mix(in srgb, var(--story-accent) 10%, var(--paper-strong)); border: 1px solid color-mix(in srgb, var(--story-accent) 28%, var(--soft-line)); }
  .article-icon svg { font-size: 23px; }
  .article-top > div { display: grid; gap: 3px; }
  .article-top > div span { color: var(--muted); font-size: 8px; text-transform: uppercase; }
  .article-top > div strong { color: var(--story-accent); font-size: 8px; text-transform: uppercase; }
  .article-arrow { margin-left: auto; color: var(--story-accent); transition: transform .25s ease; }
  .article-card:hover .article-arrow { transform: translate(4px, -4px) rotate(8deg); }
  .article-type { position: relative; z-index: 1; margin-top: 22px; color: var(--story-accent); font-size: 8px; letter-spacing: .09em; text-transform: uppercase; }
  .article-card h3 { position: relative; z-index: 1; margin-top: 9px; font-family: var(--display); font-size: clamp(25px, 3vw, 38px); line-height: .98; letter-spacing: -.045em; }
  .latest-article h3 { max-width: 840px; font-size: clamp(36px, 5vw, 64px); }
  .article-summary { position: relative; z-index: 1; max-width: 650px; margin-top: 14px; color: var(--muted); font-size: 12px; line-height: 1.58; }
  .article-bottom { position: relative; z-index: 1; display: flex; align-items: flex-end; justify-content: space-between; gap: 18px; margin-top: auto; padding-top: 20px; }
  .article-tags { display: flex; flex-wrap: wrap; gap: 6px; }
  .article-tags span { padding: 5px 8px; background: var(--mint); font-size: 7px; text-transform: uppercase; }
  .article-cta { display: inline-flex; align-items: center; gap: 5px; color: var(--story-accent); font-size: 12px; }
  .article-cta svg { font-size: 16px; }
  .idea-playground { padding: 66px 0 20px; }
  .topic-cloud { display: flex; flex-wrap: wrap; justify-content: center; gap: 12px; margin-top: 34px; }
  .topic-cloud span { padding: 12px 17px; color: var(--ink); background: var(--paper-strong); border: 1px solid var(--line); box-shadow: 4px 4px 0 color-mix(in srgb, var(--blue) 15%, transparent); font-size: 10px; text-transform: uppercase; cursor: default; }
  .topic-cloud span:nth-child(2n) { color: var(--note-ink); background: var(--note-bg); transform: rotate(1.5deg); }
  .topic-cloud span:nth-child(3n) { color: var(--on-ink); background: var(--blue); border-color: var(--blue); transform: rotate(-1.5deg); }
  @media (max-width: 980px) { .featured-video-grid { grid-template-columns: 1fr; } .latest-video-card { display: grid; grid-template-columns: minmax(260px, .9fr) 1.1fr; gap: 18px; } .latest-ribbon { position: absolute; left: 24px; top: 24px; z-index: 2; } .latest-video-copy { padding: 18px 12px; } .video-rail { grid-auto-columns: minmax(260px, 47%); } .shorts-section { grid-template-columns: 170px 1fr; } .article-grid { grid-template-columns: 1fr; } .article-card.latest-article { grid-column: auto; } .writing-doodles { inset-inline: -70px; background-size: 760px auto; opacity: .075; } .wall-notes { display: none; } }
  @media (max-width: 680px) { .writing-hero { grid-template-columns: 1fr; } .publishing-dial { width: 124px; height: 124px; justify-self: start; margin-top: 8px; } .watch-stage, .reading-stage { padding-block: 50px; } .video-heading { grid-template-columns: 1fr; } .video-heading .hand { justify-self: start; } .video-copy { padding: 23px 20px 25px; } .video-copy h3 { font-size: 32px; } .video-actions { align-items: stretch; flex-direction: column; } .video-actions .btn { width: 100%; } .latest-video-card { display: flex; } .latest-ribbon { position: static; } .video-rail { grid-auto-columns: minmax(250px, 88%); } .shorts-section { grid-template-columns: 1fr; padding: 16px; } .shorts-heading { flex-direction: row; align-items: flex-end; } .shorts-rail { grid-auto-columns: 150px; } .reading-title { grid-template-columns: 1fr; } .article-card, .article-card.latest-article { min-height: 360px; padding: 22px 20px; } .newest-flag { position: static; align-self: flex-start; margin-bottom: 18px; } .article-bottom { align-items: flex-start; flex-direction: column; } }
`;

export default BlogsPage;
