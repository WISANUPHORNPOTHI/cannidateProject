export const baseInputClass = `
  h-11 rounded-md border px-3 text-sm
  text-gray-800 bg-white

  transition-all
  duration-300
  ease-out

  focus:outline-none

  border-gray-300

  focus:border-blue-500
  focus:ring-2 focus:ring-blue-300
  focus:-translate-y-[2px]
  focus:shadow-lg

  /* error (override focus) */
  aria-[invalid=true]:border-red-500
  aria-[invalid=true]:ring-2
  aria-[invalid=true]:ring-red-300
  aria-[invalid=true]:shadow-lg
  aria-[invalid=true]:translate-y-0
`;
