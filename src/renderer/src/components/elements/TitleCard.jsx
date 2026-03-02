import React from 'react'
import CustomButton from './CustomButton'
import titleStatus from '../titleInfos/titleStatus'
import titleStreams from '../titleInfos/titleStreams'
import titleGenders from '../titleInfos/titleGenders'
import titleTypes from '../titleInfos/titleTypes'
import titleClass from '../titleInfos/titleClass'
import { FaEdit, FaGlobe, FaTrash } from 'react-icons/fa'
import { FaMagnifyingGlass } from 'react-icons/fa6'
import { Link } from 'react-router-dom'

/**
 * @typedef {Object} Props
 * @property {string} classificacao
 * @property {string} estrelas
 * @property {string} genero
 * @property {string} id
 * @property {string} nota
 * @property {string} status
 * @property {string} stream
 * @property {string} tipo
 * @property {string} titulo
 * @property {string} image
 */

/**
 * @param {{ props: Props }} props
 */

export default function TitleCard({ props }) {
  return (
    <div className="flex justify-center">
      <Link to={`/titulo/${props.id}`} draggable={false}>
        <div
          key={props.id}
          className="w-[660px] min-w-[550px] h-[120px] container mb-3 rounded-md flex items-center justify-between hover:scale-102 duration-300 hover:duration-300 cursor-pointer shadow-md"
        >
          <div className="h-full mx-3 rounded-md p-2">
            <img
              src={props?.image}
              alt=""
              className="w-full min-w-[80px] bg-[#222] h-full rounded-md object-fill"
            />
          </div>
          <div className="flex justify-between w-full">
            <div className="text-white mx-4 uppercase font-bold">
              <h1 className="text-2xl flex text-wrap break-words" title={props.titulo}>
                {props.titulo.length > 17 ? `${props.titulo.substring(0, 17)}...` : props.titulo}
              </h1>
              <h1 className="text-gray-400" title={`Stream`}>
                Stream: {titleStreams.find((x) => x.value === props.stream).name}
              </h1>
              <h1 className="text-gray-400" title={`Status`}>
                Status: {titleStatus.find((x) => x.value === props.status).name}
              </h1>
            </div>
            <div className="text-white mx-4 items-center flex">
              <h1
                className={`
                            text-3xl font-bold
                            ${props.estrelas == 1 && 'text-red-500'}
                            ${props.estrelas == 2 && 'text-orange-500'}
                            ${props.estrelas == 3 && 'text-yellow-500'}
                            ${props.estrelas == 4 && 'text-emerald-500'}
                            ${props.estrelas == 5 && 'text-green-500'}
                            `}
              >
                {props.estrelas * 2}/10
              </h1>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}
