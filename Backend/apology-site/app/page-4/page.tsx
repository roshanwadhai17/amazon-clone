// app/page-4/page.tsx
"use client";
import React, { useRef, useState, useEffect } from "react";
import { useInView, AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ArrowLeft, PauseCircle, PlayCircle } from "lucide-react";
import FightTimer from "../../components/FightTimer";
import QuestionCard from "../../components/QuestionCard";
import { useRouter } from "next/navigation";
import { Kalam, Caveat } from "next/font/google";

const kalam = Kalam({ subsets: ["latin"], weight: ["400", "700"] });
const caveat = Caveat({ subsets: ["latin"], weight: ["400", "700"] });

export default function Page4() {
  const router = useRouter();

  // Scroll Audio Trigger Setup
  const photoRef = useRef(null);
  const isPhotoInView = useInView(photoRef, { once: true, amount: 0.1 });
  
  // Audio Controller
  const ytPlayerRef = useRef<HTMLIFrameElement>(null);
  const [isMusicPlaying, setIsMusicPlaying] = useState(true);
  const [destroyAudio, setDestroyAudio] = useState(false);
  
  // TRACKER FOR 73 QUESTIONS
  const [questionStatus, setQuestionStatus] = useState<Record<string, boolean>>({});
  const TOTAL_QUESTIONS = 73;

  useEffect(() => {
    const handleStatus = (e: any) => {
      setQuestionStatus(prev => ({ ...prev, [e.detail.id]: e.detail.isComplete }));
    };
    window.addEventListener('question-status', handleStatus);
    return () => window.removeEventListener('question-status', handleStatus);
  }, []);

  const pauseMusic = () => {
    if (ytPlayerRef.current?.contentWindow) {
      ytPlayerRef.current.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
    }
    setIsMusicPlaying(false);
  };

  const toggleMusic = () => {
    if (!ytPlayerRef.current?.contentWindow) return;
    if (isMusicPlaying) {
      ytPlayerRef.current.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
    } else {
      ytPlayerRef.current.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
    }
    setIsMusicPlaying(!isMusicPlaying);
  };

  const navigateSafely = (path: string) => {
    pauseMusic();
    setDestroyAudio(true);
    router.push(path);
  };

  // STRICT VALIDATION: Blocks navigation if any field is empty
  const handleNextPage = () => {
    const completedCount = Object.values(questionStatus).filter(status => status === true).length;
    
    // Safety check - ensures we don't proceed if any question is incomplete
    if (completedCount < TOTAL_QUESTIONS) {
      alert(`⚠️ You cannot proceed yet!\n\nPlease make sure every option is ticked and every text field is filled before moving forward. 🙂\n\n(Completed: ${completedCount} / ${TOTAL_QUESTIONS})`);
      return;
    }
    
    navigateSafely('/page-5');
  };

  useEffect(() => {
    return () => pauseMusic();
  }, []);

  const deskStyle = { background: 'repeating-linear-gradient(90deg, rgba(0,0,0,.035) 0 2px, transparent 2px 9px), #cfb594' };
  
  const paperStyle = {
    backgroundColor: '#fffaf0',
    backgroundImage: 'linear-gradient(90deg, transparent 34px, rgba(192,57,43,.45) 34px, rgba(192,57,43,.45) 36px, transparent 36px)',
    boxShadow: '0 2px 3px rgba(0,0,0,.2), 0 12px 28px rgba(0,0,0,.25)',
  };
  
  // Blue lines removed for a clean diary page look
  const linesStyle = {
    paddingLeft: '48px', paddingRight: '24px', paddingTop: '24px', paddingBottom: '48px',
  };
  
  const textClass = "font-bold text-[15.5px] text-[#1f3a6e] indent-0 mb-[24px] leading-[24px]";

  return (
    <div className={`min-h-screen flex flex-col text-[#1f3a6e] ${kalam.className}`} style={deskStyle}>
      <FightTimer />

      <AnimatePresence>
        {isPhotoInView && !destroyAudio && (
          <motion.button 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={toggleMusic}
            className="fixed bottom-20 right-4 z-50 bg-[#1f3a6e] text-white p-3 rounded-full shadow-2xl flex items-center gap-2 border-2 border-white/20 hover:scale-105 transition-transform"
          >
            {isMusicPlaying ? <PauseCircle className="w-6 h-6" /> : <PlayCircle className="w-6 h-6" />}
            <span className="font-sans font-bold text-sm hidden md:inline">
              {isMusicPlaying ? 'Pause Music' : 'Play Music'}
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* The invisible Background Music Player (Starts automatically when photo is in view) */}
      {isPhotoInView && !destroyAudio && (
        <iframe 
          ref={ytPlayerRef}
          width="1" height="1" 
          src="https://www.youtube.com/embed/nzelzk2sVH8?enablejsapi=1&autoplay=1&start=8" 
          allow="autoplay" 
          className="opacity-0 absolute pointer-events-none z-[-999]"
          suppressHydrationWarning
        />
      )}

      <main className="flex-1 flex justify-center items-start py-12 px-4 md:px-8 relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full max-w-4xl rounded-sm relative z-10 mb-24"
          style={paperStyle}
        >
          <div style={linesStyle}>
            
            <h1 className={`${caveat.className} text-4xl font-bold mb-[24px] text-[#3a2a1e] leading-[24px] pt-1`}>
              Worst Chapter
            </h1>
            <p className={`${caveat.className} text-2xl opacity-85 text-[#3a2a1e] mb-[24px] leading-[24px] indent-0`}>
              Mala ha Chapter nako hota but mi add kela...I genuinely want you to understand what went wrong here, so that you never repeat the same mistakes in your life.
            </p>

            <p className={textClass}>Never want to Discuss this anymore so Answer the questions Wisely</p>
            <p className={textClass}>I have Accepted all my faults, Now it's your turn to accept the facts and ur own mistakes. Kahi garaj nahi konala defend karychi " tyach tyala mahit " he nahi bolu shkt tu...</p>
            <p className={textClass}>Tu swata Accept kela Ki Aniket hota possessive, attached ani Obsessed karycha to jara jastach mage mage... Mhnun tu ignore pn karat hoti tyala… Distance thevycha prytna pn kela</p>
            <p className={textClass}>Always Remember tula Office madhe sarvch Tillya chya Navane Chidvat but mi tula office madhe kadich tya Tillya chya navane chidvla nahi... Pn tula jeva mi bolayla laglo tr tula swatalach thoda samjayla pahije hota.</p>
            
            <p className={`${textClass} font-extrabold text-[#3a2a1e] bg-[#fff1a0]/50 px-2 rounded-sm border-l-4 border-red-500 py-1`}>
              Ani kuthlya pn mulala kuthlya pn muli sathi feelings asu shktat... But it's completely upto u ki tyala kasa treat karych... tula avdat asel tr go for it otherwise Just Don't give a Fuck… Friendship vachvayla yevdi ghan nastat karat
            </p>
            
            <p className={textClass}>Let's start from beginning</p>
            <p className={textClass}>Tula aadi pasun mahit ahe Tillya  khup jasta introvert ahe, to kona sobt jasta involve nahi hot, tyala amhi loka sodun dusra koni olkhat pn nahi office madhe... Are tyala Tillya sodun dusra kahi bolat pn nahi mula... Are tyala muli tr sod mula pn bhav nahi det...Ani tulach kasa avdla to kay mahit.</p>
            
            <QuestionCard id="p4q1" question="Q- Dipali just think of it... Ki tyach khana pina uthna basna sarv amchya sobtch hota... Are amhi week madhun 3 veles tr Chicken thali khayla jaycho...Random Trips karycho, khup jagi firayla geloy sobt, Tujya peksha Changla friend tr amcha asayla pahije na... tu tr sarvan sobt same rahychi yacha sathi tr kahi special nohta tuja... Mg to ka yevd ghari jaun message karycha fkt tula ? kay ahe Tujyat asa special ani different ?" options={["Mulgi ahe mhnun", "to sarvana divas ratra message karto"]} hideInput={true} />
            <QuestionCard id="p4q2" question="Now just tell me Dipali tula Aniket Divas ratra message karycha teams vr, insta vr, Whatapp vr. why is he treating me differently from everyone else? Tula he sarv tyach special treatment avdaych ka ?" options={["Ho Avdto", "Kahi garaj Novti"]} hideInput={true} />
            <QuestionCard id="p4q3" question="Let's assume tyala amhi sarv nahi avdt tyala baher khup sare mitra ahet but do u think to tyana Hourly update vichart asnar... Tula jasa Desperate houn “Dipe Dipe” karat hota tasa tyancha sobt karat asnar ?" options={["Ho karto", "Nasel karat"]} hideInput={true} />
            <QuestionCard id="p4q4" question="Do u think to tya sarva mitrana Divas ratra reel spam karun tu pn pathv bolat asnar ?" options={["Ho karto", "Nasel karat"]} hideInput={true} />
            <QuestionCard id="p4q5" question="Do u think ki to tyana ignore karte bolun unfollow karycha te pn 4 veles ?" options={["Ho karto", "Nasel karat"]} hideInput={true} />
            <QuestionCard id="p4q6" question="Do u think to tyani Tyancha sobt Hackthon wala randi rona kela asta ? Eka bed vr zopnarya sangram la ekda pn nahi vicharl ? Bas tula yevda tras dila...asa Kuthla Relation hota re Tumch ? Commited hoti kay ?" options={["Ho karto", "Nasel karat"]} hideInput={true} />
            <QuestionCard id="p4q7" question="Do u think Aniket Specially kuthlya eka person sathi Office madhe yeu shkto… jeva ki to past one year pasun office la alach nahi sidelach ahe tyachi room… Nahi ala kadi office la ,amhi pn mitrach hoto, Bhai tyachi Team bolvychi tari pn novta yet…bas tuja sathi aala fkt ? mg tr sarvch Chidvnarch na" options={["ahe mi tyachi Tilli", "kahi garaj nohti tyachi"]} hideInput={true} />
            <QuestionCard id="p4q8" question="Do u think Tillya kuthlya pn Friend sathi Auto Book Karun tyacha Possessive nature dakhvat aasel jeva ki baki che mula chup chap shant basle astil ? Tula wata kay to konachya yevd mage mage yet asnar ?" options={["Mi tyachi Tilli ahe chalt he sarv", "to sarvan sathi cab karto cab driver ahe to"]} hideInput={true} />
            <QuestionCard id="p4q9" question="Tyala yevde Mitra aste tr tyala sangram sobt 1 Rk karun Akurdi nasta rahav lagla, konch nahi tithe ata amchya college ch... Mi tr gelo asto maja Mitran chya flat vr kuthe pn bhetla asti jaga. Tu kuthe geli asti junya Friends kade ki separate." options={["Junya Friends kade", "Seprate bagitla asta"]} hideInput={true} />
            <QuestionCard id="p4q10" question="Bhai tyache sarv old ani new roommates maje mutual ahe ekani pn Tyacha Birthday chi story nahi takli... Even Tyacha One and only rcurrent oommate Sangram ni pn tyala dusrya divshi wish kela amchya sobt... Bhai Tyacha tr Bestie ni pn story nahi takli... Are even tyachi Bestie tyala Follow pn nahi karat arts walya account ni... Kar bhai accept ki to ahe chape to fkt mulina divas ratra message karto... Mg tr kuthli pn mulgi bolnarch na... Mg kay ha tilla Bestie bolnar kay Chutiya Kuthla... Ka nahi kela mg Final year project ticha sobt ? Tu kella na Dipali tuja FY project swatchya Bestie sobt... Ha ka nahi karu shakla ? One Sided bestie ithe pn... Kona sobt karycha asta project tyani Bestie sobt ki random?" options={["Bestie Sobt karnar", "Random Mulan sobt karnar"]} hideInput={true} />
            <QuestionCard id="p4q11" question="Q- Dipali amchya sarvan kade VM VDI hota khup aadi pasun... Mahesh kade tr ekdam survat pasun... Tyala techyt tr kadich yevda intrest nahi aala tujya vdi, vm ani project madhech to yevda ka ghusaycha... Tyala ka divas ratra update ghyache aasyche tuja kadun... 'Kay chalay'... Ye tula shikavto Springboot... Ye tuja Interview gheto... Ka sarkh sarkh tuja Vm ani Vdi bgych hota... Ka tula yevda message karycha... Bhai bakin sobt atleast 1% tari hota kay ? yevda involve nasto hot kadi Kuthla mulga if tyala tya muli madhe interest Nasel... Are tai mi swata Anushkacha project karun dilay 😅... Personal interest... Samjat ja jara" options={["Avdat tyacha he sarv mala", "Nohta avdat"]} />
            <QuestionCard id="p4q12" question="Q- Dipali ektari vela tyani dusrya kuthlya mulala add kela kay call madhe chukun( Mahesh la ani mi sodun karan te tu kela hota) ? Ka asla One to One secret relation pahije tyala... Dipali side la Tyacha roommate Sangram asto baslela nehmi tyala pn vicharu shkto kahi pn... Pn tyala Dipe Dipech ka karych hota... konala pn vicharu shkto na random.. Tuch ka fkt ?kay ahe special tujyat " options={["mala sarv mahit aste", "tyala fkt mich pahije"]} />
            <QuestionCard id="p4q13" question="Q- Bhai dipali to yevda jasta involve jhala ki tu swata tyala boli... Yevda kay interest maja project madhe...yetos kay maja project madhe. So that completely mean ki tula pn hi sarv faltu giri nohti avdat tr kadi straight forward houn boli ka nahi he sarv Special treatment band kar mhnun ?" options={["Avdat hota mala", "boli hoti tyala"]} />
            <QuestionCard id="p4q14" question="Q- are Dipali tyani literally swata accept kelay ki mi Mulanche reels seen vr sodto... Pathvna tr dur... Mg mi bolo ki Dipali la tr spam karto... Tila samorun pathvayla lavto tr chup jhala to jhatu... Are Even to abhishek bola tyala tuja samor amchya tr seen vr sodto... Mahesh pn bola metro walya scene nantr ki eka eki yevdya reels ka pathvtoy... Rikama hota kay... Bhai jaun vichar office madhun konala pn tumhala reels wagera pathvto kay? Just Tell me Dipali ka pahije hoti tula Tyacha kadun hi special treatment ? Tula avdyach ka to tasle random reel spam karych without any context ?" options={["Ho Avdta", "Nahi Avdat"]} />
            <QuestionCard id="p4q15" question="Q- Bhai dipali mala laaj wate te tula salag 3 reel pathvayla ani to random spam kartoy... Ani tu bolte ki tyala... ektari reel pathvavich lagte... Are mi jeva he tyala bolo tyani literally tula reels pathvna band kela hota ... Tyala mahit hota ki he sarv faltugiri to fkt tuja sobt karat ahe... Now just tell me tyane Reels pathvna band kela tr tula jevan nohta jaat kay? Kay garaj jaun vicharychi ki 'kay jhala Majya Pillu la,naraj ahe ka maja pillu?' 😁😁" options={["Garaj hoti", "Nohti garaj chukli mi"]} />
            <QuestionCard id="p4q16" question="Q- are Dipali amhi sarv mula samorun tyala Birthday wish karyla call kela ani to jhatu bolto meet made ahe ani join pn nai karat... Bhai tu vichar swata sujal, yashraj kiva konala pn kasa ahe tumchya sobt... Jaun vichar last time kadi bolna jhalay ?...Ani Dipali tulch yevda Desperate houn call karyla ka lavto ? Tula avdt kay te... Ye dipali tula gpt download karun deto 😂🤣... are dipe dipe ye tula Kyc ch sangto... Random Dumbass shit karychi aste tyala tuja sobt... Are even tujhi bahin boli re 24/7 bolychi mhnun... Ani tuch boli ki mi message wagera naste karat... Toch karto ...Tula kay wate tuja sobt jevda involve jhala baki kuthe jhala asnar kay ha Tillya ?" options={["Ha tillya khup Hot ahe tyala ahet khup sare GF", "Ghanta"]} />

            <h2 className={`${caveat.className} text-3xl font-bold mb-[24px] mt-[48px] text-red-600 underline decoration-wavy underline-offset-4 leading-[24px] indent-0`}>
              Now Let's come to very hot topic 🔥🔥🔥
            </h2>
            
            <p className={textClass}>(Just want to remind u ki mi hya point prynt tula Aniketchya Navane chidvna band kela hota )</p>
            <p className={textClass}>Bg Dipali hya point prynt tula tyani Manual testing cha role dila hota... Je ki tula bilkul nohta pahije... Mhnun Dipali mi tula Nehmi bolycho ki Dsa kar, Revise kar, Navin projects banav Resume madhe add karyla... Tula Job switch karyla kiti Motivate karat hoto roj Yeun... Yevda motha Essay pathvla hota Wp vr Manual Qa dila hota ani tu naraj hoti tevha.</p>
            <p className={textClass}>So jeva mala Hackathon ch Samjla so I thought ki Sarv Rikame mulana gheu kaam karyla ani Dipali la pn Gheu so that you will get some exposure to development... Mi tr selfless houn tula bolo hoto tula Resume madhe kahi tari Add on karta ala pahije mhnun... Ani tu ho pn boli ani Complete One week amchya Project vr kaam pn kela... Btw mi Mail aalya vr lagech tula convince kela hota hackathon sathi... Kahich delay nohta 🙂.Khup option hote majya kade still I choosed you</p>
            
            <p className={textClass}>My intention was simple: I wanted you to learn something, gain experience, and have another opportunity to grow. There was no hidden agenda from my side.</p>
            <p className={textClass}>Mg Monday la Aniket ni Mahesh la sangun tula Call madhe add kela... Mg Dipali tu amhala Yeun boli ki Yashraj ani Mahesh mala Force karat hote Tyacha team madhe yayla... Pn tu tyana Nahi bolun aali asa tu amhala tya call madhe boli... Tu boli ki Yashraj ni Tuja Employee Id tya jhatu Aniket la kadun dila... But tu tyana tari pn nahi boli ani sangitla ki tu amchya group madhe ahes...but tyani form nahi bharla ?</p>
            <p className={textClass}>Mg Dipali mi tula tyach Divshi sarvan samor bolo ki Yashraj la jaun sang ani clear kar sarv... Aplyala kahi problem nako samor... Even tula personal call karun bolo pn the same day... Tu te nahi kela... Tu tujya Boy friend kade jaun kahi tari karun aali ani tuja Boy Friend chidla asnar 100%.</p>
            <p className={textClass}>Nantr Thursday la Sujal Office la gela hota ani maja sobt call vr hota tevdyat Yash aala ani Sujal tyala bola ki kay re yasha aplya maitrit kashala Rajkaran aantoy... Amcha Gat kashala phodtoy... Mg mi bolo yasha tula mahit hota ki Dipali amchya Team madhe ahe tr tula Employee Id kadun ticha Jabardasti Form bharychi kay garaj...</p>
            
            <QuestionCard id="p4q17" question="Q - Mg Yashraj garam houn bola ki Dipali ni amhala clear nahi bolich nahi ani mala kay mahit ticha Employee Id... Form wagera sarv Aniket ni bharlay... Aniket lach pahije hoti Dipali... Amhala tr kahi ghena dena nahi ticha... Btw Aniket la pahile pasun mahit hota tu amchya team madhe ahes sangram mule 😅 still tyala tu pahije hoti… jaun Yashrajlach vichar to he bola ki nahi …Tu khoti ka bolis ?" options={["Tillya la Commited ahe mi", "Kahi Garaj Nohti Tillya la he sarv karychi"]} />
            <QuestionCard id="p4q18" question="Q- To mala bola watla tr Dipali la add kar ani tilach vichar kay jhala... Ani mg mi tula add kela ani tu lagech Palatli Bhai... He ashi ka paltli tu jeva ki tu amchya sobt last 1 week pasun kaam karat hoti ? Mg hi faltugiri tuja Bf ni sangitli kay ? karan toch lagla hota tuja mage hya sathi. Mi tr he bolo ki tula kahi karychi garaj nahi mhnun. Mg tr kahich problem nasta. " />
            <QuestionCard id="p4q19" question="Q- Yashraj aajach(18/10/26)  mala bola ki Dipali ne Aaple fukat bhandan lavun dile... Maja kahich role nohta sarv tya Aniketch vishay hota... Khota watat asel tr jaun vichar Yashraj la ?kay Image Create jhali ahe bhai tuji bakin samor… jara swata vichar kar… Nastat karat yevd eka mula mage" />

            <p className={textClass}>Dipali at that Moment Sujal mala tuja badal khup kahi bola ki kasli faltu mulgi ahe aplya sobt yevdya divas kaam karat hoti ani lagech palatli... Tya peksha apn kuthlya pn random mula la gheu... Mohit la bolu 🤣🤣...Still mi tuja vr vishwas theun tula bolo ki Dipali jaun Fkt Tyacha Group leave kar, ani tuja stand clear kar... Still tu khup vichar karat hoti karan fkt ekach hota ani te mhnje tuja Bf Aniket. Karan farak fkt tyalach padnar hota 😁😁 and I am literally waiting for that 😅</p>
            <p className={textClass}>Dipali yevd sarv jhalya vr tu tyancha group Saturday la ratri 12 vajta leave kela... Thanks alot Man 🥲</p>
            <p className={textClass}>Bhai mi khara sangto mala mahit hota hya nantr kay honar… Mala mahit hota ki fkt tya Tillya la mirchi lagnar… ani to tyach sarv Obsession ani Attachments tula dakhvnar… bhai mala karta yet future predict mala mahit hota ki to he sarv karnar… Mulan madhe rahto mi samjta mala mulana kuthlya muli sathi feelings asle tr te kase wgtat.</p>
            
            <p className={`${textClass} mt-[48px]`}>Now the Real game begins 😁</p>
            
            <QuestionCard id="p4q20" question="Q- Tu to Group leave kela literally konalach ghanta farak nahi padla ...but tujya BF Aniket lach yevdi mirchi ka lagli ?" options={["Possessive hota mhnun", "Maja Shivay Project nasta banla mi khup hushar ahe"]} />
            <QuestionCard id="p4q21" question="Q- Now Just Tell me Dipali aapn sarve ek dusryanche changle mitra ahot... Do U think Aniket je Possessive houn tula amcha pn group leave kar he bolna valid hota ? Tula kay wata office madhun koni tari kona sobt he sarv karu shakla asta kay ?" options={["ho", "Nahi"]} />
            <QuestionCard id="p4q22" question="Q- Bhai Dipali to mulga Literally 3-4 divas tuja mage lagla amcha Group leave kar bolayla mg tu maja kade pn aali ani mala boli mi tula ek message takte ani tyala ho Reply kar... Kasli faltu giri hoti... Thod tari Swata sathi stand ghetla ala pahije na... Sorry Sorry karat baste... Ka yevda sarv sahan karat basli ? Baki dusrya sobt kela asta kay tyani he sarv ? Baiko ahes ka tyachi… Cheat karat hoti kay ?" options={["Commited ahe tyala", "Chukla Maja"]} />
            <QuestionCard id="p4q23" question="Q- Now just tell me one thing Tyacha Roommate Sangram 100 times Better hota tuja peksha, tu tr busy hoti khup teva... Sangram la tr kahi kaam pn nohta any time sangram would be a better choice still Didi tumcha BF obsessed houn tuja kade Randi Rona karat rahila... Committed hoti kay tyala tu ? Eka chaddar madhe jhopnarya Roommate peksha Javal chi ahes ka tyala ?" options={["Mala Avdta Tillya ch he behaviour", "Kahi garaj nohti tyacha hya posseviness chi"]} />
            <QuestionCard id="p4q24" question="Q- are Tai tula khara wata ki tyala hackathon madhe thoda tari interest hota... Ghanta, tyala Fkt Dipali madhe Interest Hota... Bhai tyani Mentor la contact tari kela kay... Are Ppt tari dili kay jaun vichar konala pn... Tya nantr tr hackathon cha topich nahi kadla kadi... Tyala fkt tuch Pahije hoti ajun kahich nahi 🤣😂... Yalach Boltat na Obsesssion… Career Oriented nahi, Dipali Oriented hota to" options={["Majya Shivay tyacha Project complete nohta hou shkt", "Hota tyala Obsession"]} />
            <QuestionCard id="p4q25" question="Q- Now Didi tell mi ki Tillyachya jagi Mi kiva Kuthla pn mulga asta tr tyani yevda Randi Rona fkt tuja sathi kela asta kay ?... Tuja Swatachya stand la kahi importance nahi kay ?" />

            <p className={textClass}>Pn Maushi maja tr tasa kahi nohta re... Mi tr simple sarv rikame ani interested mula bagun ek team banvli hoti... Ani tula Ghetla tyat karan fkt ekach ki tula job switch karyla kahi tari sangayla bhetnar... Purna Selfless hoto Didi...but still Dipali tya nantr tu je kahi nakhre dakhvle team meet join karyla I can't even forget it... Ka swata la badlat hoti tya Obsessed Aniket sathi kay mahit. Kiti defend karav lagycha Dipali mala tula Sujal ani tya bandi samor thaklo hoto mi 😢. Mg at the End Jeva Alex ni 12 chya aadi ppt magitli mi tyala janun khup late dili... So Aapn Automatically baher padlo... Hech pahije hota na tula 😁😁... Khara bolych tr sarvech loka seriously kaam tr karat hote 35% project tr complete pn jhala hota but kadi kadi kahi ghosti ardvat sodavya lagtat 🥲.</p>
            
            <QuestionCard id="p4q26" question="Q- Pn bas mala majhi chuk sangnar kay... Maja manat tr kahich nohta bhai tasla... Bas tuja future sathi hoto thoda concerned. Watat hota tujhi hi jaga nahi mhnun.Tya Tillya sathi tu yevd khali padli ?" />

            <h2 className={`${caveat.className} text-3xl font-bold mb-[24px] mt-[48px] text-red-600 underline decoration-wavy underline-offset-4 leading-[24px] indent-0`}>
              Now let's come to next Hot Topic 🔥🔥🔥
            </h2>
            
            <QuestionCard id="p4q27" question="Q- Ha Hackathon wala honya aadi tyani tula Unfollow kela hota ani he hackathon ch vicharyla prt follow kela... Kiti bayla ahe ha chii 🤮🤮... Ani tu tyala defend karyla kiti boli chukun jhala asel... Mi kiti bolo ki tyani janun kela ahe tula mental torture karnya sathi... Still tu bolychi ha Glitch khup vela jhala ahe maja sobt... Ka re yevda Blind Trust karte tya Tillya  vr ? Ata pn tula chukun jhala tech wata kay ?" options={["ahech maja Tillu yevda changla", "Tillu kahi pn karu shkto maja sobt"]} />
            <QuestionCard id="p4q28" question="Q- But Dipali tu khara tyach he sarv ignore karun bhari kela... But Tuja lover tula prt follow karto ani bolto ki mala tula reel nohti pathvat yet mg Samjla ki Unfollow jhalay 🤣😂 are kasla Chutiya banvla tula aani tu yevdi bholi ki tu banli pn... Kay garaj tyala khota bolychi" options={["Maja Tillu Khota nahi Bolat kadi", "Chalt Tillu khota bola tari pn"]} />
            <QuestionCard id="p4q29" question="Mi swata tu jeva mala he sangitla teva tula unfollow karun continuously 4 reel pathvlya 😁😁ani tula kadi mahit pn nasta padla ki mi tula unfollow kelay... Even Sujal samor pn bolo ha vishay...still tyala defend karat hoti... black magic kelay tuja vr tyani 😱 Kiti easily Chutiya banvla tula tyani 😎... He sarv faltu giri avdta kay tula ?" options={["Avdta", "Nahi Avdat"]} />

            <p className={textClass}>Tu he sangitlya nantr tyani tula prt Unfollow kela hota mala te reel scroll karta karta Samjla hota... Mala teva Samjla hota ki Dipali u are going through something terrible... Mhnun mi tula tya Divshi call karun 2 tas basun rahilo ani bolo sang aniket badal... Kay jhala te sang... Tu kahich nohti sangat... Then I played my Ultimate move... Mi tula bolo ki dipali Aniket ni tula kadi pn message kela tr mala sangat ja. Mala watla ki tu he bolya vr tari sangnar ki to tula Unfollow karun he sarv tras ka det ahes... But still kahich nahi... Are Dipali mi tithe tuja problem samjun ghenya sathi baslo hoto re 2 hrs... Bas mala yevdch samjat hota ki tu khup saffar karat ahes... Mala khara nohta samjat ki mi karyla pahije... Mg mi bolo let her handle it udya bagu...</p>
            <p className={textClass}>Then mi 2nd Day la sakalich call karun bolo ki bol Dipali ata khara khara kay jhalay... Ani tu Literally chup houn phone katla mala Samjla hota ki tu radat ahes... Mi lagech call back pn nahi kela bolo ki tula thoda time deu... Mg nantr jeva mi tula bolo message karun ki sang kay jhala mahit ahe mala... Mg tula pn controll nahi jhala ani tu khup radayla lagli... Ani tu boli ki mala sang mi kay karu ata... Mi bolo thoda time de honar nit... Tya divshi pn 2 hrs tuja sobt basun rahilo kahi garaj nohti mala... But Dipali tu radat hoti ani mala khup kharab watat hota.</p>

            <QuestionCard id="p4q30" question="Q- Tai Believe me... Mi pn mulga ahe ani tuja khup Changla Mitra pn in case kadi udya chalun apla thoda bolna kami hot asel due to some reasons... Tr mi tuja kade Yeun bolnar 'Kay re Attitude ala ahe ka jasta... Meli kay... Yevda attitude bara nahi...' Ani aali vel tr senti marnar...Tula wata kay mi kiva Kuthla pn Normal Mulga tula Unfollow karun Ignore karte bolun Randi Rona karnar kay te pn 3-4 veles ?" options={["Hota Mr Tillu Obsessed", "Kiti Handsome ahe Tillya, mala Avdt he sarv mhnun"]} />
            
            <p className={textClass}>Dipali it's a pure sign of Obsession... Kuthlach mulga aplya Friend sobt asa nahi wagnar... He tr Proper GF BF wala Relationship madhe asta kadi interest kami jhala tr breakup ani block wagera…</p>

            <QuestionCard id="p4q31" question="Kona sathi kela hota Insta Deactivate Tillyasathi ch na? Mi tr teva bolat pn nohto insta vr, Maja tr kahich role nohta teva , mi tr popcorn khat maja bgt hoto ? aaj prynt kela kay kadi aadi insta Deactivate eka mula mule? Block pn karu shakli asti" options={["Ho Tillya sathi", "Tuja mule"]} />
            <QuestionCard id="p4q32" question="Q- Are Dipali tu tyala Reply dyala thoda delay karat asnar tr to yevda Desperate houn pagal jhala ki tula direct unfollow wagera karyla lagla... Konich asli Faltugiri sahan nasti keli... Te pn to jhatu Prt follow karycha ani prt Unfollow... Mood Swings hot hote tya Bailya la... Yevda kasa Serious Relationship jhala yaar Tumch ki to yevda Obsessed jhala hota tula asa kay kela ahes tu techya sobt ? Tu Committed kadi jhali Dipali tyala ?" options={["I am Commited to Mr Tillu", "Mala Nahi pahije asla sarv"]} />
            <QuestionCard id="p4q33" question="Are Dipali tu tr bolychi ki amhi fkt Abhyasach bolto mg ho faltugiri tujya abhyasacha part ahe ka ?" options={["Yes, its part of it", "Tyani thoda Over kela"]} />
            <QuestionCard id="p4q34" question="Q- kuthli pn Normal mulgi asti tr asla Obsession kadich sahan nasta kela kuthlyach mulacha lagech block karun... Free jhali asti tu kay kela ?" />
{/* https://www.instagram.com/reel/DeEo1wJRfMe/embed
 */}
            {/* Reel 1 (DeEo1wJRfMe) - Direct iFrame, completely error-free */}
            <div className="my-[48px] flex justify-center w-full">
              <iframe 
                src="https://www.instagram.com/reel/Dblag9Wox4S/embed" 
                width="320" 
                height="540" 
                frameBorder="0" 
                scrolling="no" 
                className="rounded-xl shadow-lg border border-[#1f3a6e]/20 bg-white max-w-full"
                suppressHydrationWarning
              />
            </div>

            <QuestionCard id="p4q35" question="Q- Believe me hi reel mi majya one sided love la pathvnar jeva ti mala bhav dena kami karnar… Ka banycha ahe BC tyala tuja Humsfar ? Jhatu bolto mi ithe Kaam karyla aaloy... He koncha kaam chalay... ? Ha pn Abhyasacha Part ahe ka ?" />

            <p className={`${textClass} font-extrabold text-[#c0392b] bg-[#fff1a0]/30 border-l-4 border-red-500 pl-4 py-2 my-[24px]`}>
              Hya Point prynt Dipali tula tyach Sarv Obsesssion, Possessiveness ani Attachments samjle hote ani mhnun tu tyla boli ki Boundaries thev aapn fkt Collegues ahot… mg nantr cover up pn karun ghan keli tu.
            </p>
            <p className={`${textClass} font-extrabold text-[#c0392b] bg-[#fff1a0]/30 border-l-4 border-red-500 pl-4 py-2 my-[24px]`}>
              Let me be very Frank... Tuja sarkhi Over Friendly mulgi jar konala Boundaries Maintain kar bolat asnar, aapn bas Collegues ahot, Thoda Distance maintain kar, obsessed nako hou, Possessive nako hou... Attachments nako theu asa bolat asnar na tr kharach Issue khup serious asnar... 
            </p>

            <QuestionCard id="p4q36" question="Q- What do u think Dipali asli faltu giri Office madhlya kuthlya pn mulani tuja sobt keli asti kay ?... Bhai he sarv karyla aali ahes kay Office la? Ani ha Tillya Tula Career Oriented kasa wato Didi ?" />

            <p className={textClass}>Bhai Dipali tu tya mulala yevd sarv bolun geli ahes boli hoti ki ata aapn bolna band karu, mala Break de thoda still to tuja sobt bolayla yet hota... Bhai mi tr khara vishwas nahi karu shakt ki yevd sarv jhalya vr koni kasa yeu shakt bolayla chi 🤮🤮 yaar... ani chal to aala tr ala tu kashi bolu shkte normal... Tillya ni Black magic kelay 🤣🤣... bolto ye mi Dsa shikvto 😂😂 are yevda bhari asta tr sobt asta kay... Ani tulach ka baki kon nahi ajun ?ani Dipali khara Bhai yevd jhalya vr pn tu tya mula sobt bolat hoti tyala bhav det hoti... On the other side mala boli hoti ki ... Mi tyala asa bole tasa bole ata to yenar nahi bolayla... Bolychi ki ata tyacha sobt kahich involvement nahi...</p>
            
            <QuestionCard id="p4q37" question="Q- Kay garaj yevd khot bolychi ? ani Khara kuthli pn Normal mulgi prt aslya obsesssed ani faltu mulala bhav nasta denar incase tila interest Nasel tr ?" options={["Chukla Maja", "To ahech yevda Handsome ki Mala karmat navta"]} />

            <h2 className={`${caveat.className} text-3xl font-bold mb-[24px] mt-[48px] text-red-600 underline decoration-wavy underline-offset-4 leading-[24px] indent-0`}>
              Let's jump on the Other topic 🔥🔥🔥
            </h2>
            <p className={textClass}>Mi Coforge Day chya 1 week aadich punyala alo hoto... Teva office la konch nohta yet bas Mahesh ani Abhishek yet hote kadi kadi... Mg mich yash ani sujal la bolo ki office madhe ye jara maje karu... Teva amhi office madhe 8 prynt thambt hoto TT khedt mi, yash, kannade ani mahesh full time pass chalu hota... Jatana jevan karun jat hoto ghari... Maja nahi bhai kona sobt wakda sarvch mitra ahet maje.</p>
            <p className={textClass}>So now just for ur kind information... Eventchya eka divasa aadi ratri jevtana amhi sarv discuss karat hoto kasa jaych tr... Teva ghanta konala mahit pn nohta Tuja Lover Aniket yenar ahe ki nahi... Even Sangram la pn vicharl tr to pn bolto tyach nahi mahit mala... Jeva sangramni sakali call kela teva Samjla ki to pn ahe mhnun... Nahi tr ghanta konala tyach ghena dena nohta... Karan to nahi hot Mulan madhe yevda involve... are event la pn to tujya sathich ala I am damn sure... Bhai tyach yevd motha Operation jhala te pn amhala yetana Metro madhe Samjla 😅 je ki tujya Bf ni tula Adich sangitla asel 😏.</p>

            <QuestionCard id="p4q38" question={'Q- Now just tell me Dipali Event la Yevde sarv mula hote... Sarvch eka dusryan sobt Hi Bye karat hote... Amhi swata sarvan sobt jaun bolo... But tuja Obsessed Aniket Bas tulach shodat hota... Tula kay wata mula tula asach "Tillya chi Tilli chidvat kay 😂"?\nBhai literally tu dislya vr kasa Yeun chipkla bhai... "Are Dipali tula kiti call kele mi lavda lasun... "\nAre even Sujal tyala bola re " are ho Patil amhi pn ahot bajula amhala pn vichar kadi 🤣"  tula kay mula chutiya watat kay... tyana kay samjat nahi ka tyach fkt tuja sobtch abnormal ani desperate behaviour... mg tr bolnarch na tula " Tilli "😁 are kuthli mulgi yevd Boundaries thev wagera bolun geli tari tyala laaj kashi nahi watli ? Sarvan sobt ka nahi wagat tasa ?'} />
            
            <QuestionCard id="p4q39" question={'Q- Are to Abhishek tujya Aniket ani amchya Sarvan samor Yeun bolto ki " ha Tillya Dipali mage pagal jhalay mala bolto ki aaj kuthlya pn Haltit Dipali la bhetych ahe 😅"\nmg Sujal bola ki " Are ata amchya samor jevatana Bhetla ki Dipali la 😂"\nmg Abhishek bola ki " ha Ka mala nohta mahit he 🤔 "\nmg Mahesh bola ki " Ektyat bhetaych Asel Tilli la 😁"\nWtf Bhai kay relation ahe tumch? Baki konala tr ghanta farak nahi padla tuja yevda... bas sarvech as a friend bolat hote ? Tyalach ka yevd Desperation ani Obsession ? Ani te pn yevd sarv past madhe jhalya vr… mg tr bolnarch tula Tillya chi Tilli\n( Jaun vichar konala pn khota watat asel tr )'} options={["Sorry", "Samajla Mala Sarv"]} />

            <QuestionCard id="p4q40" question="Q- Are Dipali just tell me apn pn changle Friends ahot even sarvat jast bolna maja sobt asnar tuja... Even tya veles tr apn kasa jaych, konasobt jaych, he sarv discuss karat hoto mi tr even tula kiti bolo ki Omkar sobt cab ni ye... Ani at the end bolo ki scarf wagera bandun ye 3-4 tras travelling khup tras honar… Bahin samjun bolo, care karto mhnun… karan mala mahit ahe Hinjewadich Deadly Traffic…But mi Event madhe tula ek tari vela kadi Yeun kahi bolo kay ? Just firta firta kadi disli tr gamat karycho bolycho ki Double Line madhe lagli 😅 mg sujal pn maja gyach... Teva pn mi Majya team la shodat hoto... Are Even Dance chya veles Yashraj mala kiti vela bola ki ' Dipali la call karun bolov Dance karyla sarvana Gheun ' pn mi Nahi bolycho… Maja sod re tithe ektari mulga Disparate houn fkt tula bhetyla ala hota kay ? Sarvech sarvan sobt involve hot hote ? But Dipali tuja Obsessed Tillya la fkt tuch pahije hoti 😂 tuja sathi mulan sobt dance karyla pn nahi aala." options={["Mala pn Tillu la bhetych hota prt", "He sarv faltugiri nahi chalnar mala"]} />
            <QuestionCard id="p4q41" question="Q- Are Dipu Didi tuja kahi varshat lagna honar ahe... Lahan nahi rahili ata... Just Tell mi kutlya Muli la tya event madhe asa Obsesssed houn Kuthla mulga shodat hota... Yevd jhalya vr... Kuthlya mulila Tillya chi Tilli kiva kahi pn koni chidvla kay ? Tuja sobtch ka hotay asa ? Ka yevd Desperation…" />

            <p className={textClass}>Bg Dipu Didi tyani Hackathon sathi je kahi Bhasad keli amchya Virdodhat mala tyacha khup Raag hota… mala tuja kahi ghena dena nohta… Baki konalach kahi farak nahi padla tyalach ka… Mitra bolto na amhala Mg asla faltu pana ?</p>
            <p className={textClass}>tu mala aadich full permission dili hoti ki je kahi bolych ahe te tya Tillya la bol... Ata tu madhe nahi padnar... Ani yevd sarv bagitlya vr tr mi he karnarch hoto... Then I found the best place to ask him a simple question ki "</p>
            <p className={`${textClass} ml-8 border-l-2 border-[#1f3a6e]/40 pl-4 opacity-90`}>
              Bhai Aniket last week madhe fkt tulach mirchi ka lagli jeva Dipali amchya team project madhe hoti ?<br/>
              Ka Yevda ignore karte bolun 3-4 veles Follow Unfollow cha Randi Rona ? Block karna lodu yevdch asel tr<br/>
              Bakin sobt jasa wagto tasach tya Muli sobt pn wag na ka yevda divas ratra message karto... Tila kay tichi life nahi kay ?<br/>
              Ka yevda involve hot ahe fkt tichya sobt baki mula pn ahet na... Hya sarvan sobt last kadi bola ?<br/>
              Are tich ka pahije hoti tula tuja Hackathon madhe... Jhatu tya sangram la tr ekda pn nahi vicharl tu ? Tichya mage lagun Unfollow ka kartoy yevd kay Possessiveness Bayko ahe ka tujhi ti. <br/>
              Yevda kay ahe tya Muli madhe ki tu mitrana sobt Rada kartoy ticha sathi… ka yevda mage mage kartoy
            </p>
            <p className={textClass}>"<br/>Ani ha tyani he sarv kelay ani mi he sarv bas point out kela tr tula vait watat asel tr mandh ahes tu.</p>

            <QuestionCard id="p4q42" question="Q- Bhai Literally Dipali tujya Lover kade bolayla kahich nohta... Tuja lover kahich bolu nahi shakla 😁😁...  Ani at the end bolto ki ' mi mulga ahe tr mala mulich avdnar na, Avdte mala Ti... mhnun mi ticha mage mage karto ' Tujya kade ahet ka hya questions che answer Tyacha kade tr bilkul nohte ? " />

            <p className={textClass}>Bhai yevd sarv jhalya vr Amhi jeva tyala vicharl ki Bhimashankar chalnar kay teva to bola nahi amhi fkt 1 divasa sathich alo hoto… Flat wagera kahi tr sapdycha hota bhadya la</p>
            
            <QuestionCard id="p4q43" question="Q- Mg to tya nantr office la aalch ka ?...BC last 1 year pasun Office chya bajula rahato tari kadich nahi ala... Are sada mitrana bhetyla nahi ala kadi... Ani Dipali Bas tujya sathi to tya divshi Office la ala bhai... Mg tr sarve chidvanarch na Tillya chi Tilli 🙂 ani mg tya Abhishek sarkhe pn bolnarch bhetaycha asel tr Room book karychi Office la kashala yeta... Ka pahije asli faltu giri tula ? Lover kartat aplya target cha picha asa ? Just tell me aplya office madhe kon karta asa ki ti mulgi yet ahe mhnun mi aaj janar office la ?" />
            <QuestionCard id="p4q44" question="Q- Are mi swata tya Sangram la vicharl ki kay jhala te aaj kasa kay office to bola are Aniket la kaam hota aaj office la... Ani kay kaam hota te tr sarvanach samjla ahe... Bhai koni tari office madhe tuja sathi ala hota kay tithe ? Mg tuja loverch ka yevda desperate houn ala ? Ani te pn yevd sarv jhalya vr... Boundaries thev bolya vr ?" options={["Mala Pahije hota Tillu office madhe", "Kahi garaj Nohti Office la yaychi"]} />
            <QuestionCard id="p4q45" question="Q- Bhai tu tyala even nako yeu boli hoti... Still to ala... Tuch sang Dipali incase tu tyala sangitlach nasta ki tu office madhe yenar ahe tr to ala asta kay ?Are jhatu bolto mi Ata bara jhalo Roj office la yenar... Nantr to Halkat kadich nahi ala btw... Tyala fkt tuch pahije 🤣🤣" options={["Mi chukli sangun", "Mala Pahije hota Tillu"]} />

            <p className={textClass}>Ani khara tu thodi Chutiya ahes ka tya Obbssesed mulala sangitlch ka tu ? Bhai literally lover sarkha ala tuja mage... Mg tr koni pn he abnormal nature pahun bolnarch tula Tillya chi Tilli 😁😁</p>

            <QuestionCard id="p4q46" question="Q- Bhai yevd sarv faltu giri jhalya vr tu tya mula sobt jaun boluch kashi shkte.? Are Aai shapat sangtoy kutlich Normal Changlya ghartli mulgi he sarv kadich nahi karnar eka obsessed ani possessive mula sobt... Jaun swatacha female friends lach vichar he konchi Friendship maintain karat hoti tu ? Yevd Boundaries cross jhalya vr khutli friendship rahili ?" />
            <QuestionCard id="p4q47" question="Q- Dipali tula khara laaj watyla pahije ki tu tya Obsessed mulala Chal jevan karyla boli... ajun pahije hote kay tula Attachments tya Tillya che ? Bolte ki tyala tu metro mahe yevda bola Mhnun vicharl kay samband ? Ata prynt tya jhatu ni je kahi kela te visrun geli kay ? { Maje Paise Pathav bol tya Bhikarya la tyala je kahi khala tyache… tuja ani tya Sangram kadun kahi nako mala pn Tya Bhikaryani nahi pathvle ajun}" options={["Mala tyacha sobtch jevaych hota", "Chuk keli mi"]} />
            <QuestionCard id="p4q48" question="Q- Dipali just Tell me Aniket aaj prynt kadi tari Carrom khedla ahe ka bas tuja sathi to te pn khedayla ala ? kay relation ahe tumch ? ani Ka Dila Dipali tu tyala O auth tuja khara sang? BC tyach tr kahi ghena dena pn nahi O auth sobt ? Mi tr roj waprto mala pn bolu shakli asti ? I am 100x smarter than him… konal pn kahi pn problem asla tr maja kade yeto… Sarv Dot net wale ajun pn ahe maja Contact madhe mhnun teams vr pn ani insta vr pn… yevda Interesting ani Hushar wato kay Tillya tula ki kahi tari ugach bolnya sathi karan pahije hota tula ? " options={["I love Tillu", "Mi tula Vicharu shakli asti"]} />
            <QuestionCard id="p4q49" question="Q- Chal yevd sarv pn koni sahan karu shkto pn mala bas yevd sang ki mi tuja sobt yet hoto tr fkt hya Jhatulach ka tras jhala... Baki konala tithe ghanta farak nahi padla tyalach ka yevd... Sarvana mahit ahe tu majhi Changli maitrin ahes mi tr tula bahin pn bolto mg kasla possessiveness ? Yashraj tr swata bola na mala jaun sodun ye… tyala tr mahit pn hota Roshan Chidla ahe mhnun Dipali vr ?" options={["Ahe to Possessive", "tyala ahe mage mage karychi savay"]} />
            <QuestionCard id="p4q50" question="Q- Mi tr Janun Tillya cha Posseiveness Dakhvayla tula chal bolo… Ani tula chalt kay te sarv tyacha Posseiveness ? kasa kutrya sarkha mage mage aala Bhai" options={["Maja kay chukla didi"]} />
            <QuestionCard id="p4q51" question="Q- Are tyacha one and only roommate Sangram la Samjla ha Jhatu tillya ithe faltu giri kartoy mhnun to tya Jhatu sathi ek second pn nahi thambla chala gela ekta ghari... Tyala even he pn aadich mahit hota ki office pn fkt tuja sathi Yetoy... Ani tu kiti mandh ahes Didi tya jhatu la validation det basli... Simple bolych tula kay karych jasa baki ahet tasa raha." options={["Mi tyala Committed ahe", "Chutiya ahe to"]} />
            <QuestionCard id="p4q52" question="Q- tula kiti divsan pasun bolat hoto ki asle faltu attachments hou nako deu... Tya Chutiya mulala tu sodun konch nahi... Ani tula mi Tyacha kadun dur kart hoto Tyacha tyala tras hota bas... Mhnun Tyacha dungnala yevdi aag lagli... Baki mulana ka fark nahi padla ani Boundaries thevnar hote na tyach kay jhala ? Kay garaj padli tya jhatu la tuja sathi auto book karychi... Committed ahes ka tyala tu ?" options={["Lagna karnar ahot amhi", "Kahi garaj Nohti Tyachi"]} />
            <QuestionCard id="p4q53" question="Q- Bhai tya jhatu Obssesed mulach tond bagych hota bhai tu kasa jhala hota...  Ani still tula tyala ka possessive hot ahe he bolta nahi ala... Are ka yevd possessivness baki konalach tr ghanta farak nahi padla... Ani ha Jhatu mulga Tula Career Oriented wato kay ?" options={["Dipali Oriented ahe to", "Mala pn ahet Feelings tyacha sathi"]} />
            <QuestionCard id="p4q54" question="Q- Tu tyacha Auto madhe jaunch ka basli... Mi tr tula bolelo ki mi samor jaun nantr swata utrun janar tula maja yevdach tras asel tr... Tu Tyacha possessiveness la validation nako det basu... Tu he faltu giri ka keli bas yevd sang ?" options={["Chukla maja", "Aniket Important ahe mala"]} />
            <QuestionCard id="p4q55" question="Q- He sarv jhalya vr are tyala jeva simple viharl sarvan samor ki ka yevda dipalichya mage mage kartoy... Ka yevda possessive jhalay ticha sathi... Kay garaj yevdya attachments chi... Amchi pn maitrin ahe amhala tr kahi nahi watat tichya badla tr Dipali to clear cut bola ' Avdte mala Dipali... Ti majhi Personal life ahe, tula tyat Padychi kahi Garaj Nahi  ' tula pn avdto kare to Tillya ? Tujhi pn personal life ahe ka to ?" />

            <p className={`${textClass} font-extrabold text-[#c0392b] bg-[#fff1a0] p-4 shadow-sm border border-[#e6d990] my-[24px]`}>
              “Mi Mulga ahe tr Mala Mulich Avdnar na, Avdte mala Dipali, mhnun mi tila yevd special treat kartoy… tula amchya Madi padychi kahi garaj nahi, ti majhi personal life ahe” Jaun Vichar konala pn he to bola ki nahi … Bahini sarkhi ahe kiva Changli Maitrin ahe he pn bolu shakla asta 
            </p>

            <QuestionCard id="p4q56" question="Q- Dipali tuji bahin jeva mala tuja BF boli teva at the very next moment mi tula Spiderman wali Rakhi pathav bolo...tu Majya bahini sarkhi ahes tu bolo... Pn to Tillya sarvan samor boltoy ' Mala Dipali avdte... It's my personal life '  tula khara tya Tillu Lover ani Majya madhe difference nahi samjat ka ?... Ahet Bhai tyala Feelings tujya sathi... Bolu shakla asta na Majya pn bahini sarkhi ahe ?" options={["Mala pn Avdto Tillu Roshan Chutiya Madhi padtoy", "Mala Nako ahe Tillu"]} />
            <QuestionCard id="p4q57" question="Q- Mi tr bas tyach possessiveness ani obsession dakhvat hoto... Bas yevd sang kay farak padla asta Majya sobt aali asti tr ? Tula bas tya jhatu la yevd bolta nahi ala ki tula ka yevda fark pdtoy baki mulana tr ghanta farak nahi padla ? Tulach ka yevdi mirchi lagat ahe ? Committed ahes ka Didi tyala ?" options={["Chukla Maja", "Tuja sobt Kuthech nahi yenar"]} />
            <QuestionCard id="p4q58" question="Q- Bhai to Bauna tujya samor mala auto madhun uttar bolat ahe... Ani tula he sarv chalat kasa hota Didi ?... Tyacha dolyat obsession disat nohta ka tula ?... Believe me tya time la account madhe yevde paise hote ki tya auto la ani tya bikharila la at a moment vikat Ghetla asta 🤑... Kay liky ahe tyachi... Mi kadich konachya Financial condition vr joke nahi krt but to tyach level cha ahe... Bhai tyach tonda varun samjla nahi ka tyach tuja vrch prem 😁" options={["Prem tr mala pn ahe", "Chukla maja"]} />
            <QuestionCard id="p4q59" question="Q- Dipali tula kharach kahi Regret nahi kay je kahi tu tya Possessive,Obsessed ani Pevert mula sathi maja sobt kela ? Mi tr Changla Mitra hoto nehmi selfless houn madat karat rahilo... Are ghanta bhai Dipali kuthech kami nahi padlo mi.... Nehmi Boundaries Maintain thevlya... Are tuja vr kahi pn problem asla tr rahycho bhai tuja sobt ubha bhava sarkha... Are nehmi Group madhe add karycha prytna kela... Nohta padu dyach tula ekta... Nehmi khush thevycha prytna kela... Nehmi Motivate karat rahycho Project sathi, kama sathi, even Job Switch sathi... Kadi Bimar padli tr kalji ne message pn karycho... Kadi traveling madhe kiva kahi pn asla tr nehmi tuja safety ch vichr karycho... Are even late night kaam karat asli tr ragvla pn... Nehmi tula Admire kelay karan tu sarvch barobr handle karat hoti...  Ani khup kahi hota aapla ani He je kahi ahe te eka mitrachi responsiblilty ahe. Bas yevd sang mi kuthe kami padlo Dipu Didi ? Ani mojvat nahi ahe just asking kuthe kami padlo ? Yevd bhari Return dila bhai tu Majya Selflessness cha 😅" />

            <p className={textClass}>Bhai Dipali tu literally tu tujya tya possessive Boyfriend la hero banvla ani mala villain... Bolych na sarvana ki ha chutiya Obsessed houn yevda ka mage mage kartoy... Yala ka yevde attachments jhale ahet... Yevda ka possessive ahe ha... Mi tr fkt Tyacha he sarv Obsession baher kadla tula prove karyla ani kelay mi prove... Ani tula yevd sangun pn samjat nasel tr Techya premat padli ahes tu ? Bhai Kay avdta techya madhe tula( Height/ tyach roj roj message karna )</p>

            <QuestionCard id="p4q60" question="Q- Even yevd sarv jhalya vr tula bas mi Bus stand vr sodun denar bolo ki just every one know ki Dipali don't have any problem with Roshan... Simple and clear... Tula hyat pn tras hota... Tu bhai yevd pn nahi karu shakli ?" options={["Tu Mela tari fark nahi pdt mala Aniket matter karto", "Chukla maja"]} />

            {/* Photo triggers music on view */}
            <div ref={photoRef} className="my-[64px] flex justify-center">
              <div className="w-full max-w-sm border-4 border-white shadow-xl bg-white rotate-2 hover:rotate-0 transition-transform duration-300 p-2">
                <img 
                  src="https://lebwsxrihuokgnqkyrxt.supabase.co/storage/v1/object/public/Nothing/WhatsApp%20Image%202026-11-01%20at%2019.39.17.jpeg" 
                  alt="Chocolates" 
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>

            <QuestionCard id="p4q61" question="Q- Dipali mi swatchya Bahini kade gelo hoto rakhi bandayla tila ani tula same chocolates ghetlya mi... tula pn mi bahinch samjto... Traveling madhe Majhi Aai nehmi amchya dogana kahi tari sweet khayla dete karan amchya dogana pn Motion sickness cha problem ahe... In same Gesture mi tula ti chocolates dili karan tula pn vomitingch tras ahe... Bhai khup ragat hoto mi still apli responsibility nahi visarlo. But tu kay kela tyach te tulach mahit 😅" />

            <p className={textClass}>Bg mala pn sakhi Bahin ahe ani tu pn mala tichya sarkhich ahes and Believe me whatever I have Done in ur case... I am damn sure I will Definitely do the same even in my Sisters case... Mi kuthech chuklo nahi... Tu Friendship maintain karnya madhe khup chutiya pna kela ahe...</p>
            <p className={textClass}>Mi Majya Bahini la hi sarv condition sangitla ani vicharl tu kay kela asta sang Frankly...</p>
            <p className={textClass}>Tr ti boli ki mala jevha Samjla asta ki ha mulga fkt aplyalach Different/Special treat kartoy... Fkt Aplaych divas ratra mage mage kartoy... Tr mi aadich Distance maintain kela asta... Ani tyala clear sangitla asta bakin sobt jasa rahto tasach raha... Jast close yeu nako... Yevd kela asta tr he sarv jhalach nasta... Ani yevd sarv kelya vr tr mi Block karun free jhali asti...Friendship maintain karycha wagera tyat kahi alach nahi... Majhi pn self respect ahe asla Tilli wagera chidvna ani tya varun tyachi asli faltugiri nasti sahan keli.</p>
            
            <QuestionCard id="p4q62" question="But tu kay kela ?" options={["Tujhi Bahin Chukichi ahe", "Mich Chukli"]} />
            
            <p className={textClass}>Ti he pn boli ki "Dada tu pn chukla ki ahes... jasa tu maja vr chidto tasa tu tichya vr nohta chidayla pahije" ... Mg mich tila bolo ki "ti pn mala tuja sarkhich ahe"</p>
            <p className={textClass}>Yevd sarv jhalya vr mi bas tula ek promise magitla... Nako hota mala he chida chid tuja vr... tu swatachi Shapt ghetli Didi teva... Mi bolo ki swatachi nako majhi ghe… kay chukla maja.</p>

            <h2 className={`${caveat.className} text-3xl font-bold mb-[24px] mt-[48px] text-red-600 underline decoration-wavy underline-offset-4 leading-[24px]`}>
              Roshan's Complete Point of View
            </h2>
            <p className={textClass}>Always Remember Dipali mi tula Tillya chya Navane aadi kadich chidvla nahi... Mi with point bolna chalu kelay</p>
            <p className={textClass}>But Jeva tu mala call karun Screen share karat hoti... Teva mala nehmi Tillyach vr disaycha... Adi tr mi maja Ghetli fkt, mala pahile watych ki tuch karat asnar mg Samjla ki tillu jasa baki sobt ahe tasa tuja sobt bilkul nahi... Tula divas ratra message karto... Bakin chya contact madhe pn nahi 😅 mi tula warn karyla chalu kela... Bolycho ki tya Tillya la hot ahet tujya sobt attachments hot ahe to Possessive... Are hotya Dipali tyala tuja sathi feelings nahi tr tyani tula yevd abnormal kadi treat kelach nasta yevd mage mage kadi aalach nasta... Ani mi barobr hoto bhai</p>

            <QuestionCard id="p4q63" question="Q- Kuthla mulga aplya khup mage mage karat asel... Aplya la baki mitran peksha alag treat karat asel... Divas ratra garaj nastana BF sarkha text karat asel... Group madhe nahi tr nehmi individual personal space create kart asel... One to one relation banvych try karat asel... Jya mitran sobt divas ratra maje kelet tyana ignore karun fkt tula call karyla lavat asel... Thoda Bolna kami jhala tr Obssesed houn Randi rona karat asel, dusryan chya team madhe asla tr possessiveness dakhvun team leave kar bolat asel, reels spam karat asel ani tula samorun pathvat ja bolat asel... Ani baki mitranche seen vr sodat asel, aapn alo tr aplya mage mage office la yet asel, sarvan samor Dipali Avdte mhnun accept karat asel, Tyacha mule sarv lok tila Tilli chidvat asel tr kuthli pn mulgi Tyacha sobt Distance maintain karun tyala Dur karel... Fukat che attachments nahi thevnar...tu tr Friendship Maintain karnyachya nava khali kay kay kelay sahan. Yevdi tr aakal aste konala pn…" options={["Maja Chukla", "Mala pn ahet Feelings"]} />

            <p className={textClass}>Bg bhai mi Mulan madhe rahato mala mahit ahe mulanchi mentallity... Incase amhala kuthlya muli sathi feelings asnar tr amhi tila special treat karnar... Ugach tila message karnar... Nehmi ticha madat karych try karnar...ticha life madhe khup involve honar... In simple words tila baki Mitran peksha special treat karnar... Tya mulala tujya sathi pahile pasunch Feelings hotya but now it's completely upto u ki tya Obssesed Tillya la kasa tackle karych... But tu tyala ajun validation det basli... Tula thodi tari akal pahije ki he sarv special treatment aplyalach ka ? Kahich special nahi tujyat bakin Mulan peksha... Thoda tari Boundaries tu maintain karyla pahije hotya tuja side ni... Mi khara sangto mala koni avdat asta tr mi pn Aniket sarkhach kela asta... Mi swata answer pathvycho anushka la test che 😅, mi swata project pn banvun dila ticha... Mg mahit padla ti booked ahe... Vichar konala pn... Asach asta sarv mulanch... Thoda thoda karun involve vaycha ani mg Dhappa... Tyala ahet feelings tuja sathi khota watat asel tr kar propose tyala let's see his reaction 😂 bolte Majya Best Friend sarkha hota to... Are office madla Kuthla pn mulane tula divas ratra message karun involve jhala tr tyala Best Friend bolnar kay ?</p>
            
            <QuestionCard id="p4q64" question="Q- Btw Dipali mala pn kuthli mulgi avdat asel tr mi tila Rani sarkha thevnar... Tila maja tras wagera kadich nahi honar...Tila impress karych try karnar… In the same way Tillya cha pn tula kadich tras nahi honar... Bas lagnat Yeun radnar tujya 😂 Are Tillya jevda tula latakla tevda kuthlya khambya la latkla tr tyachi pn Height amchya yevdi asti... Bolte mala Tyacha tras nohta karan to tula maitrin samjatch nohta... Lovercha kasla tras bhai🤣🤣" />
            <QuestionCard id="p4q65" question={'Q- Tu nehmi bolychi karte tyala handle karte tyala handle\nBas tula yevd bolych hota... Solution to your complete problem\n" Jasa Baki office chya mitran sobt rahat tasach maja sobt raha "\nPn tu yevd pn nahi bolu shakli... Mhnje tulach special treatment pahije hoti 😅'} />
            <QuestionCard id="p4q66" question="Q- Tyala swata samjlya vr ki he sarv faltugiri Roshan la samjat ahe tr to swata dur kay hota... Ani tu kay karat hoti tyala Reel pathvun tyala message karu  ajun provoke karte ? Kay garaj ?" options={["Mala Nohta karmat", "Chukla maja"]} />
            <QuestionCard id="p4q67" question="Q- Sense of Humor pn nahi, Height pn nahi, looks pn nahi, bhari personality pn nahi, Confidence pn nahi, presence of mind pn nahi, abhysat pn sarvan sarkhach average ahe, muli tr sod mula pn bhav nohte det tyala office madhe, sarv tillya boltat tyala... Jhat kon Respect pn nahi det tyala… ka pahije mg to Any Reason ?" />

            <p className={textClass}>Ani ha ata pn tula watat asel ki tu je kahi mala sangitla ahe tya mule ha sarv problem jhala ahe... tu tya Tillya ch ani tuja Relationship private thevych asta... Tr Tujya yevd Mandh Buddhi konch nahi... Tula bas Tyacha sobt Distance maintain karych hota... Yevd divas ratra to chipkun hota swatachi bahinch boli 24/7 asto mhnun to ani tu swata bolte ki toch message karto... So it's Not My fault... Tula bas aadich distance maintain karych hota. </p>
            <p className={textClass}>Majhi bas Yevdi chuk Ahe ki mi tujya vr Chidlo bas yevdch… Bahin bolto tula aadi Hasi majak madich sangitla ki tyach jasta hotay khup… mg nantr Prove pn karun dakhvla bg bakin sobt kasa ahe ani tuja sobt kasa… ani tya nantr tuja sobt yevd sarv Abnormal ghoshti jhalya ahet.. Didi maja je kahi Concern hota to for sure Real hota… Maja bas tu Aadich Aaikli asti tr Yevda kadich nasta jhala. Bas tu tyala ekda boli asti ki  “Jasa Bakin Sobt wagto tasach Maja sobt pn Wagh”</p>

            <h2 className={`${caveat.className} text-3xl font-bold mb-[24px] mt-[48px] text-red-600 underline decoration-wavy underline-offset-4 leading-[24px]`}>
              Now Lets Get to Current Situation
            </h2>

            <QuestionCard id="p4q68" question="Q- Mi je kahi ata Didi tula Divas ratra manvycha Prytna Kartoy tyala Attachments ch Nav detana tula vait kasa nahi watat re… Guilt ahe mala mi je kahi tujya vr chidlo tyach… majya sathi ani majya samor Radli ahes tu… Hot ahe mala Regret… Bhai tula Aadi pasun ch Admire karycho mi…Nahi watat mala tu dusrya muli Sarkhi… Nehmi tuji Care karato, bas tula nehmi khush bagych ahe… tu ahes mhnun Manvat ahe tula, nahi tr Dusrya kuthlya Muli la bhav pn nasta dila yevda… Even mi Majya GF kiva Baiko sathi pn yevda kadi Efforts nahi ghenar; mahit ahe tula kasa ahe Roshan… Tu Ahes mhunun yevda Ego Side line karun boltoy Didi… yevd vait treat karychi garaj nahi." />
            <QuestionCard id="p4q69" question="Q- Are Didi Literally jya mulin vr mi try martoy tyancha sobt kahi bolat aslo ani tuja kahi message ala tr tyana ignore karun tuja sobt bolto… ahes tu tyancha peksha Important maja sathi Devi samjto tula… tula khara wata mi tujya lagnat kiva kuthe yeun radnar… kiva tu random kuthlya dusrya mula sobt boli tr possessive honar… are Didi mich tula Nehmi bolych ki Sarvan sobt Maitri thev… He asla One to one relation changla nahi…swata tula group convo madhe add karycho… Bolycho ki Punyala jaun Maje kar mitran sobt… hach Time ahe lagna nantr Time nahi bhetnar… tula Tujya Friend chya lagnat jayla pn mich Force kela bhai bolo ki june Friends la bhetun changla watel… At a same time tumhi sarv muli hotya mhnun Yash la thoda laksh de mhnun pn bolo… Mich Force kela hota tula Event la ye mhnun pn… Bhai Even tula Prakash Soni sobt bolayla ye mhnun Office madhe pn mich gheun aalo… are mala wata bhai Dipali tu Freely jagav ani aapli life enjoy karavi… tasle attachments wagera nahit kahi ki tu maja sobt boli nahi tr mala kadi problem honar… are Ghanta but at this moment tu ahes maja priority list madhe sarvan sarkhich… Aplya Side ni Nehmi Maitri Nibhavli ahe ani Nibhvat rahanar." />
            <QuestionCard id="p4q70" question="Q- Dipali tula khara wata mi tula Efforts count karvat ahe ?... Are Didi mi je kahi kela te me khup selfless houn without any expectations kelay, mi pratyek sukha dukhat Gambhir pane tuja sobt ubha hoto... Ani Maitri Madhe He sarv karvch lagta...Ani mi Life time tuja sathi karatch rahanar... no Doubt... Maja kartvya ahe te... Bare minimum ahe te… But Didi tu je kahi karat ahes na... Ki thoda controll karu swatala... Roshan la Ignore karu mg to swata thambnar... Reels pathvychya nahit save karycha fukatcha attitude... Sada Roshan ni call kar bolo tr faltu madhe juna vishay kadun trigger karycha... Roshan peksha tula dusre log jawal che jhale ahet... Jyani sada lagnat pn swatahun nahi bolavla te tula javal che watat... Bhai sada tula party la bolavla tr mala shivya ghalanare pn hech loka hote... Yashraj ani sujal tr ajun pn boltat mala... Pn still tula te sarv javalche jhalet... Are Aniket sarkha divas bhar fkt tulach Message karun possessive ani obsessed houn basnare tuja lover tula Maja sarkha kasa watu shkto. " />
            <QuestionCard id="p4q71" question="Q- Bg Didi Mi Divas ratra mulan sobt rahato Mala Mahit ahe mulanchi Mentality… In case Kuthlya pn mulala eka mula sathi Feelings astil kiva to tya muli madhe interest asel… ani ti mulgi tyala thoda jari kay boli tr to mulga tila ghost karnar… asa dakhvnar ki tyala kahich farak nahi pdt… tulach majhi garaj ahe… mala tujhi nahi… Relationships madhe asch hota… Majhe mitra tyancha GF la ashech ghost karun torture kartat, tyana mahit ahe muli emotional fool astat tyach yetil prt…mala mahit ahe Didi mulanche Feeling kadi kami nastat hot Believe me, bas te dakhvnar nahit kadi, Aniket pn hech same pattern follow kartoy… karan tyala mahit ahe ki tu Mandh Buddhi swata janar tyacha kade" options={["mi Janar tyacha kade avdta tillu mala", "Baki mulan sarkh mala pn kahi ghena dena nahi"]} />


            {/* Reel 2 (Dblag9Wox4S) */}
            <div className="my-[48px] flex justify-center w-full">
              <iframe 
                src="https://www.instagram.com/reel/DeEo1wJRfMe/embed" 
                width="320" 
                height="540" 
                frameBorder="0" 
                scrolling="no" 
                className="rounded-xl shadow-lg border border-[#1f3a6e]/20 bg-white max-w-full"
                suppressHydrationWarning
              />
            </div>

            <p className={textClass}>Pn mi He sarv ka karu Didi ? Tu tr majhi changli matrin ahes na, Tula Impress karyla nahi baslo… Aaj tu chukli tr Bhandlo tuja sobt udya prt Sorry bolun sarv Nit karnar… nasel manat tr manvat rahanar… Maitri Madhe kasla EGO bhai kasli kay Self Respect. Tula tr kahi garaj nastana Bahin bolo ahe… bolo ki nehmi raksha karel… I will always stand by you in your Good’s and Bad’s. Tula jo kalava bandla hatha vr, tujya sathi nasel important majya sathi ahe tyach significance… Tension nako gheu tutla tr prt bandhun ghe. Tuje kadi bhandan nahi hot kay Bhau bahini sobt pn nantr sarv nit hota na ki karte Nakhre tithe pn. </p>
            <p className={`${caveat.className} text-3xl font-bold mb-[32px] text-[#3a2a1e] text-center leading-[24px]`}>
              Nibhane wale Manaaya Karte hai Didi... Choda Nahi Karte!! 
            </p>
            <p className={textClass}>Kay bolis ki Apli Friendship Tillya chya bolnya vr Depend karte… to prt ala tr prt tech tech loop…Mi last 2 months pasun tillya cha vishay pn nohto kadat… tu swata Ajeeb wagychi mg bolycho… tya addi pn 2 months kahich nohto bolo tillya badal karan tyani kami kela hota nantr tyanich yeun sarv bhasad keli. Pn bas ata tula last boltoy Tillya jasa Bakin sobt behave karto tasa tyani tuja sobt behave kela tr mala kahi problem nahi… mi thodi bolo tyacha sobt Dushmani kar ? but incase tula kahi special treatment pahije asel tr… mala problem ahe… Baki mulana tyacha kahi fark nahi pdt tr tula pn nako padyla… konala kahi ghena dena nahi tyach na tyala ahe konacha… bas kadi to bhetla tr boltat neat… yevdach… Bahin bolto tula Didi but hya peksha jasta tyach Involvement pahije asel tr mg tu prt tech chuk karat ahe… Kahi garaj nahi special treatment chi ata tari band kar… Ani nahi depend kart tya tillya vr apli friendship… Bas tu kuthe pn life madhe chukat asel tr mi as a brother tula samjvnar. Tech tr maitri aste na</p>
            
            <QuestionCard id="p4q72" question="Q- Mala Ghanta farak nahi padat tu maja konala kahi sangat asel tr karan mi khup logical hoto, ani mi sarvan sobt asach ahe… majha kahich nahi chukla… maja tuja sathi kahich novta… pn tuch vichar kar tya Aniketla ka yevda tras jhala jevha tyani je kela te sarv baher padla ? karan tyacha kade tyache answerch novte ? Bas bolto “Avadte mala Dipali, Majhi personal life ahe ti, Mhnun yevda involve hot ahe ticha life madhe “" />
            <QuestionCard id="p4q73" question={'Q- Kay Boli “ tyani pn Manvycha prytna kela asta tr tyacha sobt pn aadhi sarkhi Normal jhali asti “\nTula Sarvan Samor Possessive ani Attached houn “Mi mulga ahe tr mala mulich avdnar na, Avdte mala Dipali, ti Majhi Personal Life ahe “ \nAni Swathun Bahin bolnar mulga same kasa watu shkto… Mi tr sarvan sobt asach hoto, Majhi tr kahi chuk pn nahi.\nTya Obsessed Tillya mule yevdi sarv Faltugiri jhalya vr tula tyacha sobt prt aadhi sarkha Normal Wagycha Vichar jari yet asel… tula te sarv prt pahije asel tr U can Block me Didi, No worries ata mi nahi padnar tumchya lafdyat.'} options={["Ha karte Block tula", "Nako Aniket sobt kahi ata baki sobt jasa tasch thevnar"]} />

            <p className={textClass}>Mala Mahit ahe maja Character… Mi sarvan sobt asach hoto tu kahi special nohti… Tuja Tillu Maja Character kadi match pn nahi karu shakat… sarvan sobt Nit rahato, mhnun yevde mitra ahe ani sarvech Contact madhe ahe ajun pn…Tillu sarkh fkt tujya mage mage nahi kela… sarvanchi help karycho tuch nohti fkt… Kahi Feelings ani attachments novtya tuja sathi… Mala Aniket sarkha samjun chuk keli tu… Bhari judge kela maja Character tu.</p>

            <h2 className={`${caveat.className} text-4xl font-bold mb-[32px] mt-[64px] text-indigo-700 text-center leading-[24px]`}>
              Roshan Is Built Different — Thank You, Dipu Didi!
            </h2>
            <p className={`${caveat.className} text-3xl font-bold mb-[32px] text-[#3a2a1e] text-center leading-[24px]`}>
              Lets Close Aniket topic here Permanently
            </p>

            <div className="flex justify-center mt-12 mb-[32px]">
              <button 
                onClick={handleNextPage}
                className="px-8 py-3 rounded-full border-2 border-indigo-600 bg-indigo-50 text-indigo-800 hover:bg-indigo-600 hover:text-white transition-all font-bold shadow-md flex items-center space-x-2"
              >
                <span>Read the Diwali Gift Message</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>

          </div>
        </motion.div>
      </main>

      <div className="fixed bottom-0 left-0 w-full bg-[#cfb594]/90 backdrop-blur-md border-t border-[#3a2a1e]/20 p-3 z-40 shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
        <div className="max-w-5xl mx-auto flex items-center justify-between font-sans">
          <button 
            onClick={() => navigateSafely('/')} 
            className="flex items-center space-x-2 px-3 py-1.5 text-[#3a2a1e] hover:border-[#3a2a1e] rounded-full transition-all text-sm font-semibold border border-transparent"
          >
            <ArrowLeft className="w-4 h-4" /><span className="hidden md:inline">Previous</span>
          </button>
          
          <button 
            onClick={handleNextPage} 
            className="flex items-center space-x-2 px-4 py-1.5 bg-transparent border border-[#3a2a1e] text-[#3a2a1e] hover:bg-[#3a2a1e] hover:text-[#cfb594] rounded-full font-semibold transition-all text-sm"
          >
            <span>Next Page</span><ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}