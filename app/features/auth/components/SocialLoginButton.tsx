import { Button, ButtonProps, Image } from "@chakra-ui/react";
import { FC, ReactElement, ReactNode, memo } from "react";
import { FaGoogle, FaTwitter } from "react-icons/fa";


interface SocialLoginButtonProps {
  provider: "google" | "twitter"
  onClick: () => void
  children: ReactNode
}

export const SocialLoginButton: FC<SocialLoginButtonProps> = memo(({ provider, onClick, children}) => {
  const getIcon = (): ReactElement => {
    switch (provider) {
      case "google":
        return <Image src="/google_icon.png" alt="Google Logo" boxSize="40px" />
      case "twitter":
        return <FaTwitter />
      default:
        return <span style={{ width: '1em', height: '1em', display: 'inline-block' }} />
    }
  }
  
  const getStyles = (): ButtonProps => {
    switch (provider) {
      case 'google':
        return {
          bg: '#F2F2F2',
          color: '#1F1F1F',
          boxShadow: 'md',
          border: '1px solid',
          borderColor: 'gray.200',
          _hover: { bg: 'gray.100' },
        };
      case 'twitter':
        return {
          bg: '#1DA1F2',
          color: 'white',
          _hover: { bg: '#1a91da' },
        };
      default:
        return { bg: 'gray.100', color: 'black' };
    }
  }

  return (
    <Button
      leftIcon={getIcon()}
      onClick={onClick}
      w="100%"
      {...getStyles()}
      _hover={{opacity: 0.8}}
    >
      {children}
    </Button>

  )
})
