const Delete = ({ width }) => {
  return (
    <svg
      width={`${width ?? "22"}`}
      height={`${width ?? "22"}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="#EF4444"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6h18"></path>
      <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"></path>
      <path d="M9 10v8"></path>
      <path d="M12 10v8"></path>
      <path d="M15 10v8"></path>
    </svg>
  )
}

export default Delete;