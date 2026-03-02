/**
 * @typedef {Object} Props
 * @property {string} content
 * @property {'purple' | 'gray' | 'green' | 'red' | 'blue' | 'dark-blue' | 'yellow' | 'default'} variant
 * @property {void} onClick
 * @property {string} className
 * @property {string} href
 */

/**
 * @param {{ props: Props }} props
 */

export default function CustomButton({ props }) {
  let variant;

  if (props.variant === 'purple') variant = 'text-white bg-purple-700 hover:bg-purple-600 hover:text-white';
  if (props.variant === 'gray') variant = 'text-white bg-gray-600 hover:bg-gray-500 hover:text-white';
  if (props.variant == 'green') variant = 'text-white bg-green-600 hover:bg-green-500 hover:text-white';
  if (props.variant == 'yellow') variant = 'text-white bg-yellow-600 hover:bg-yellow-500 hover:text-white';
  if (props.variant == 'red') variant = 'text-white bg-red-600 hover:bg-red-500 hover:text-white';
  if (props.variant == 'blue') variant = 'text-white bg-blue-600 hover:bg-blue-500  hover:text-white';
  if (props.variant == 'dark-blue') variant = 'text-white bg-blue-900 hover:bg-blue-800  hover:text-white';
  if (props.variant == 'default') variant = 'text-white bg-[#121212] hover:bg-[#191924] hover:text-white border border-[#222]';

  return (
    <button
      onClick={
        props.onClick ||
        (() => {
          location.href = props.href
        })
      }
      className={`${variant} cursor-pointer p-2 0 px-4 rounded-md font-bold duration-300 hover:duration-300 ${props.className}`}
    >
      {props.content}
    </button>
  )
}
