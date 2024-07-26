import { Badge, FormControl, FormLabel, HStack, useColorModeValue } from "@chakra-ui/react";
import { FC, memo } from "react";


interface MuscleGroupSelectorProps {
  selectedGroups: string[]
  onChange: (groups: string[]) => void
  label?: string
}

const muscleGroups = [
  "胸",
  "背中",
  "肩",
  "腕",
  "腹筋",
  "お腹",
  "お尻",
  "太もも",
  "カーフ",
  "おまかせ"
]

export const MuscleGroupSelector:FC<MuscleGroupSelectorProps> = memo((props) => {
  const {selectedGroups = [], onChange, label = "鍛えたい部位（複数選択可）" } = props
  const activeBg = useColorModeValue('blue.500', 'blue.200');
  const activeColor = useColorModeValue('white', 'gray.800');
  const inactiveBg = useColorModeValue('gray.100', 'gray.600');
  const inactiveColor = useColorModeValue('gray.800', 'white');

  const toggleMuscleGroup = (group: string) => {
    let newGroups: string[];

    if (group === "おまかせ") {
      newGroups = selectedGroups.includes("おまかせ") ? [] : ["おまかせ"];
    } else {
      if (selectedGroups.includes("おまかせ")) {
        newGroups = [group];
      } else if (selectedGroups.includes(group)) {
        newGroups = selectedGroups.filter(g => g !== group);
      } else {
        newGroups = [...selectedGroups, group];
      }
    }

    onChange(newGroups);
  };
  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <HStack wrap="wrap" spacing={2}>
        {muscleGroups.map((group) => (
          <Badge
            key={group}
            px={3}
            py={2}
            borderRadius="full"
            cursor="pointer"
            onClick={() => toggleMuscleGroup(group)}
            bg={selectedGroups.includes(group) ? activeBg : inactiveBg}
            color={selectedGroups.includes(group) ? activeColor : inactiveColor}
          >
            {group}
          </Badge>
        ))}
      </HStack>
    </FormControl>
  )
})
