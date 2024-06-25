import { Button, Icon } from "@chakra-ui/react"
import { useRouter } from "next/navigation"
import { FC, memo } from "react"
import { IconType } from "react-icons"

type Props = {
  label: string
  path: string
  icon: IconType
  iconSize: string
}

const NavigationButton:FC<Props> = memo((props) => {
  const { label, path, icon, iconSize } = props

  const router = useRouter()
  const handleClick = () => {
    router.push(path)
  }

  return (
    <Button 
      onClick={handleClick} 
      w="100%"
      bg="transparent"
      _hover={{ bg: 'rgba(255, 255, 255, 0.2)' }}
      _active={{ bg: 'rgba(255, 255, 255, 0.3)' }}
      color="white"
      leftIcon={icon && <Icon as={icon} boxSize={iconSize} />}
      justifyContent="flex-start"
    >
      {label}
    </Button>
  )
})

export default NavigationButton
