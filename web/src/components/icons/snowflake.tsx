import { FC } from 'react'

export type Props = {
  color?: 'green' | 'brown'
}

export const SnowflakeIcon: FC<Props> = ({ color = 'green' }) => {
  if (color === 'brown') {
    return (
      <svg
        width="19"
        height="18"
        viewBox="0 0 19 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7.9 14.9L6.9 12.9L4.7 13.3M7.9 2.10005L6.9 4.10005L4.7 3.70005M11.1 14.9L12.1 12.9L14.3 13.3M11.1 2.10005L12.1 4.10005L14.3 3.70005M13.5 15.7L11.1 10.9M11.1 10.9H7.9M11.1 10.9L12.3 8.50005M7.9 10.9L5.5 15.7M7.9 10.9L6.7 8.50005M13.5 1.30005L11.1 6.10005M11.1 6.10005L12.3 8.50005M11.1 6.10005H7.9M12.3 8.50005H17.5M1.5 8.50005H6.7M6.7 8.50005L7.9 6.10005M7.9 6.10005L5.5 1.30005M15.9 6.90005L14.7 8.50005L15.9 10.1M3.1 6.90005L4.3 8.50005L3.1 10.1"
          stroke="#B93508"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )
  }

  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.8 11.8001L5.05 10.3001L3.4 10.6001M5.8 2.2001L5.05 3.7001L3.4 3.4001M8.2 11.8001L8.95 10.3001L10.6 10.6001M8.2 2.2001L8.95 3.7001L10.6 3.4001M10 12.4001L8.2 8.8001M8.2 8.8001H5.8M8.2 8.8001L9.1 7.0001M5.8 8.8001L4 12.4001M5.8 8.8001L4.9 7.0001M10 1.6001L8.2 5.2001M8.2 5.2001L9.1 7.0001M8.2 5.2001H5.8M9.1 7.0001H13M1 7.0001H4.9M4.9 7.0001L5.8 5.2001M5.8 5.2001L4 1.6001M11.8 5.8001L10.9 7.0001L11.8 8.2001M2.2 5.8001L3.1 7.0001L2.2 8.2001"
        stroke="#3D7E68"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
