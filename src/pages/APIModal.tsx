import React, { useState } from 'react';
import { RootState } from '../app/store';

import { useDispatch, useSelector } from 'react-redux'
import { update_APIkey, setIsAPIModalOpen } from './globalSlice';

const APIModal = () => {
  // Redux
  const dispatch       = useDispatch();
  const APIkey         = useSelector((state: RootState) => state.globalVariables.APIModal.key)
  const isAPIModalOpen = useSelector((state: RootState) => state.globalVariables.APIModal.isOpen)

  // Saveボタンを押されたらモーダルを閉じる
  const handleFormSubmit = (e: React.FormEvent) => {
    dispatch(setIsAPIModalOpen(false));
  };

  // Cancelボタン．APIkeyを空にしてモーダルを閉じる
  const handleCancel = () => {
    dispatch(update_APIkey(""));
    dispatch(setIsAPIModalOpen(false));
  };

  return (
    <div className="flex items-center justify-center fixed left-0 bottom-0 w-full h-full bg-gray-900 bg-opacity-50">
      <div className="bg-white rounded-lg w-1/3 p-6">
        <h2 className="text-center text-2xl font-bold py-4">Enter Your API Key</h2>
        <form onSubmit={handleFormSubmit}>
          {/* 入力されるたびに，Reduxのstoreに保管 */}
          <input
            type        = "text"
            className   = "w-full border border-gray-300 p-2 rounded-lg mb-4"
            placeholder = "API Key"
            value       = {APIkey}
            onChange    = {(e) => dispatch(update_APIkey(e.target.value))}
          />

          <div className="p-3 mt-2 text-center space-x-4 md:block">
            {/* Saveボタンが押されたらonSubmit */}
            <button
              type      = "submit"
              className = "mb-2 md:mb-0 bg-purple-500 border border-purple-500 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-md hover:shadow-lg hover:bg-purple-600"
            >
              Save
            </button>

            <button
              onClick   = {handleCancel}
              className = "mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-md hover:shadow-lg hover:bg-gray-100"
            >
              Close
            </button>
          </div>

        </form>
      </div>
    </div>
  )
}

export default APIModal;