import { useState } from "react";
import { BookOpenCheck, CheckCircle2, CircleHelp } from "lucide-react";

type Lesson = {
  id: string;
  title: string;
  skill: string;
  prompt: string;
  choices: string[];
  answer: string;
  explanation: string;
  visual?: string;
};

const lessons: Lesson[] = [
  {
    id: "shapes",
    title: "ပုံသဏ္ဌာန်များ",
    skill: "စက်ဝိုင်း၊ စတုရန်း၊ တြိဂံ",
    prompt: "ဝိုင်းဝိုင်းပုံကို ဘယ်ပုံလို့ ခေါ်သလဲ။",
    choices: ["စက်ဝိုင်း", "စတုရန်း", "တြိဂံ"],
    answer: "စက်ဝိုင်း",
    explanation: "မှန်ပါတယ်။ စက်ဝိုင်းမှာ ထောင့်မရှိဘဲ ဝိုင်းနေပါတယ်။",
  },
  {
    id: "counting",
    title: "၁ မှ ၅ အထိ ရေတွက်မယ်",
    skill: "အရေအတွက် ရေတွက်ခြင်း",
    prompt: "အောက်က အစက်လေးတွေ စုစုပေါင်း ဘယ်နှစ်စက် ရှိသလဲ။",
    visual: "●  ●  ●  ●",
    choices: ["၃ ခု", "၄ ခု", "၅ ခု"],
    answer: "၄ ခု",
    explanation: "ကောင်းပါတယ်။ တစ်၊ နှစ်၊ သုံး၊ လေး — စုစုပေါင်း ၄ ခုပါ။",
  },
  {
    id: "letters",
    title: "မြန်မာအက္ခရာ စတင်လေ့လာမယ်",
    skill: "အက္ခရာနှင့် စကားလုံး",
    prompt: "“ကလေး” ဆိုတဲ့ စကားလုံးရဲ့ အစမှာ ဘယ်အက္ခရာ ပါသလဲ။",
    choices: ["မ", "က", "အ"],
    answer: "က",
    explanation: "မှန်ပါတယ်။ “ကလေး” ဆိုတဲ့ စကားလုံးကို “က” အက္ခရာနဲ့ စပါတယ်။",
  },
];

export default function KgStarterLessons() {
  const [answers, setAnswers] = useState<Record<string, string>>({});

  return (
    <section className="kg-starter" aria-labelledby="kg-starter-title">
      <div className="kg-starter-heading">
        <span className="kg-starter-icon"><BookOpenCheck size={18} aria-hidden="true" /></span>
        <div>
          <h3 id="kg-starter-title">KG အတွက် ကိုယ်တိုင်လေ့ကျင့်ခန်း</h3>
          <p>THARi BOOKS မှ မူရင်းဖန်တီးထားသော အခမဲ့နမူနာသင်ခန်းစာများ</p>
        </div>
      </div>
      <p className="kg-starter-note">မိဘ သို့မဟုတ် ဆရာ/ဆရာမနှင့်အတူ ဖတ်ပြီး ဖြေဆိုနိုင်ပါတယ်။ အောက်ပါအကြောင်းအရာများသည် မူရင်းလေ့ကျင့်ခန်းများဖြစ်ပြီး တရားဝင်သင်ရိုးစာအုပ်ကို အစားမထိုးပါ။</p>
      <div className="kg-lesson-list">
        {lessons.map((lesson, index) => {
          const selected = answers[lesson.id];
          const isCorrect = selected === lesson.answer;
          return (
            <article className="kg-lesson-card" key={lesson.id}>
              <div className="kg-lesson-topline">
                <span>သင်ခန်းစာ {index + 1}</span>
                <span>{lesson.skill}</span>
              </div>
              <h4>{lesson.title}</h4>
              <p className="kg-lesson-prompt">{lesson.prompt}</p>
              {lesson.visual && <div className="kg-lesson-visual" aria-label="အစက်လေးစက်">{lesson.visual}</div>}
              <div className="kg-choice-list" role="group" aria-label={lesson.title + " အဖြေရွေးရန်"}>
                {lesson.choices.map((choice) => (
                  <button
                    className={`kg-choice${selected === choice ? (isCorrect ? " is-correct" : " is-wrong") : ""}`}
                    type="button"
                    key={choice}
                    aria-pressed={selected === choice}
                    onClick={() => setAnswers((current) => ({ ...current, [lesson.id]: choice }))}
                  >
                    <span>{choice}</span>
                    {selected === choice && (isCorrect ? <CheckCircle2 size={16} /> : <CircleHelp size={16} />)}
                  </button>
                ))}
              </div>
              {selected && (
                <p className={`kg-feedback${isCorrect ? " feedback-correct" : " feedback-try-again"}`} role="status">
                  {isCorrect ? lesson.explanation : "တစ်ခေါက် ထပ်စဉ်းစားကြည့်ပါ။ အဖြေမှန်ကို ရွေးပြီး ပြန်စမ်းနိုင်ပါတယ်။"}
                </p>
              )}
            </article>
          );
        })}
      </div>
      <p className="kg-starter-footer">အကြံပြုချက် — ကလေး၏ အဖြေကို အလျင်မလိုဘဲ ချီးကျူးအားပေးပြီး အတူတကွ လေ့လာပါ။</p>
    </section>
  );
}
