import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';

import APIModal from './APIModal';
import { RootState } from '../app/store';
import { setIsAPIModalOpen, update_Input, update_isRun, update_Person_output, update_Conclusion } from './globalSlice';
import { useAppDispatch } from '../app/hooks';

import Person_icon from '../img/person';

import getChatGPTResponse from "../methods/getChatGPTResponse";

export function DiscussionPage() {
  const dispatch = useAppDispatch();

  // API関係
  const APIkey         = useSelector((state: RootState) => state.globalVariables.APIModal.key)
  const isAPIModalOpen = useSelector((state: RootState) => state.globalVariables.APIModal.isOpen)

  // Discussionの題目
  const input_text = useSelector((state: RootState) => state.globalVariables.Input)

  // 各人のコメント
  const Person1 = useSelector((state: RootState) => state.globalVariables.Person1)
  const Person2 = useSelector((state: RootState) => state.globalVariables.Person2)
  const Person3 = useSelector((state: RootState) => state.globalVariables.Person3)

  // 結論
  const Conclusion = useSelector((state: RootState) => state.globalVariables.Conclusion)

  // 各人のコメントが格納されるテキストボックスの参照
  const person1_textbox = useRef<HTMLParagraphElement>(null);
  const person2_textbox = useRef<HTMLParagraphElement>(null);
  const person3_textbox = useRef<HTMLParagraphElement>(null);

  // 全員を囲うdiv要素の高さを格納する変数
  const [PersonDivHeight, setPersonDivHeight] = useState(300);

  const handleAPIClick = () => {
    dispatch(setIsAPIModalOpen(true));
  }

  // chatGPTにinputを送る処理
  const handleSENDClick = async () => {
    dispatch(update_isRun(true));

    if (input_text !== ""){
      // 各人がchatGPTに送るプロンプト
      const prompt_of_input_text = `${input_text}. You are a human, not AI Model. If you have a reason, answer the reason too. Please 3 sentence answer.`;

      // Person1 のコメント
      dispatch(update_Person_output({Person_name: "Person1", value: "Thinking..."}))
      const person1_output_text = await getChatGPTResponse(prompt_of_input_text, APIkey)
      dispatch(update_Person_output({Person_name: "Person1", value: person1_output_text}))
      personDivHeightAdjust();

      await new Promise(resolve => setTimeout(resolve, 3000));   // リミッタ対策

      // Person2 のコメント
      dispatch(update_Person_output({Person_name: "Person2", value: "Thinking..."}))
      const person2_output_text = await getChatGPTResponse(prompt_of_input_text, APIkey)
      dispatch(update_Person_output({Person_name: "Person2", value: person2_output_text}))
      personDivHeightAdjust();

      await new Promise(resolve => setTimeout(resolve, 3000));   // リミッタ対策

      // Person3 のコメント
      dispatch(update_Person_output({Person_name: "Person3", value: "Thinking..."}))
      const person3_output_text = await getChatGPTResponse(prompt_of_input_text, APIkey)
      dispatch(update_Person_output({Person_name: "Person3", value: person3_output_text}))
      personDivHeightAdjust();

      await new Promise(resolve => setTimeout(resolve, 3000));   // リミッタ対策

      // 全員の意見を踏まえて，意見が一致しているかどうかchatGPTに問うプロンプト．
      const conclusion_input_text = `Question is "${input_text}". Person1 says "${person1_output_text}", Person2 says "${person2_output_text}", Person3 says "${person3_output_text}". Do they all agree? If so, please summarize your conclusion based on their opinions. Then, please state only your conclusion. If not, say only "We need Discussion !!!".`;

      const conclusion_output_text = await getChatGPTResponse(conclusion_input_text, APIkey)
      dispatch(update_Conclusion(conclusion_output_text));
    } else {
    }

    personDivHeightAdjust();
    dispatch(update_isRun(false));
  }

  // 各人の吹き出しが大きくなった場合，全員を囲うdiv要素のheightを更新する．これにより，結論ボックスが下に移動する．
  const personDivHeightAdjust = () => {
    console.log("DEBUG !!");
    let height1 = 0;
    let height2 = 0;
    let height3 = 0;

    if (person1_textbox.current) {
      height1 = person1_textbox.current.clientHeight + 110;
    }

    if (person2_textbox.current) {
      height2 = person2_textbox.current.clientHeight + 110;
    }

    if (person3_textbox.current) {
      height3 = person3_textbox.current.clientHeight + 110;
    }

    setPersonDivHeight( Math.max(height1, height2, height3, 300) );  // 最低値は350にする．
    console.log(height1, height2, height3);
  }

  return (
    <div>
      <p className="m-5 text-6xl text-center font-bold text-emerald-800">
        Discussion Space
      </p>
      <div className="absolute top-9 right-5">
        <button 
          className = "bg-blue-500 text-white rounded-lg px-4 py-2 hover:shadow-lg hover:bg-blue-600"
          onClick   = {personDivHeightAdjust}
        >
          Size Reset
        </button>

        <button 
          className = "bg-red-500 text-white rounded-lg px-4 py-2 hover:shadow-lg hover:bg-red-600 mx-5"
          onClick   = {handleSENDClick}
        >
          SEND
        </button>

        <button 
          className = "bg-purple-500 text-white rounded-lg px-4 py-2 hover:shadow-lg hover:bg-purple-600"
          onClick   = {handleAPIClick}
        >
          API
        </button>
      </div>

      <div className="my-4 mx-20 flex flex-col items-center">
        <textarea
          id          = "message"
          name        = "message"
          rows        = {3}
          className   = " w-[80%] border border-gray-300 p-2 rounded-lg text-2xl text-center"
          placeholder = "Enter your message"
          onChange    = {(e) => dispatch(update_Input(e.target.value))}
        ></textarea>
      </div>

      <div className="flex justify-center items-start" style={{ height: `${PersonDivHeight}px` }}>
        <div className="px-10 flex flex-col w-[30%] items-center relative">
          <Person_icon />
          <p className="break-words bg-white border border-4 border-gray-300 w-[90%] min-h-[8rem] text-2xl p-2 text-center rounded-lg absolute top-28" ref={person1_textbox}>
            {Person1.output}
          </p>
        </div>

        <div className="px-10 flex flex-col w-[30%] items-center relative">
          <Person_icon />
          <p className="break-words bg-white border border-4 border-gray-300 w-[90%] min-h-[8rem] text-2xl p-2 text-center rounded-lg absolute top-28" ref={person2_textbox}>
            {Person2.output}
          </p>
        </div>

        <div className="px-10 flex flex-col w-[30%] items-center relative">
          <Person_icon />
          <p className="break-words bg-white border border-4 border-gray-300 w-[90%] min-h-[8rem] text-2xl p-2 text-center rounded-lg absolute top-28" ref={person3_textbox}>
            {Person3.output}
          </p>
        </div>
      </div>

      <div className="m-10 flex flex-col items-center">
        <div className="bg-white border border-4 border-gray-300 w-[80%] text-2xl p-2 text-center rounded-lg">
          {Conclusion}
        </div>
      </div>

      {isAPIModalOpen && <APIModal />}
    </div>
  );
}
