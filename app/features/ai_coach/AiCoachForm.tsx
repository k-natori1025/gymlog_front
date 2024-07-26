"use client"

import React, { FC, memo, useState } from 'react'
import { PrimaryButton } from '@/app/components/atoms/button/PrimaryButton'
import { Box, Flex, FormControl, FormLabel, Grid, Heading, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Select, Text, useToast } from '@chakra-ui/react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import axios from 'axios'
import { API } from '@/app/functions/constants/apis'
import { MuscleGroupSelector } from '@/app/components/molecules/MuscleGroupSelectore'

interface AICoachFormData {
  gender: string;
  age: number;
  trainingLocation: 'gym' | 'home';
  goal: string;
  trainingDaysPerWeek: number;
  exerciseVariety: number;
  muscleGroups: string[];
}

export const  AiCoachForm: FC = memo(() => {

  const { control, handleSubmit, formState: { errors } } = useForm<AICoachFormData>();
  const [aiResponse, setAiResponse] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const toast = useToast();

  const onSubmit = async (data: AICoachFormData) => {
    setIsLoading(true)
    try {
      const url = API.aiCoach
      const response = await axios.post(url, {
        gender: data.gender,
        age: data.age,
        training_location: data.trainingLocation,
        goal: data.goal,
        training_days_per_week: data.trainingDaysPerWeek,
        exercise_variety: data.exerciseVariety,
        muscle_groups: data.muscleGroups
      });
      console.log("レスポンス:", response)
      console.log("AIレスポンス:", response.data)
      setAiResponse(response.data.ai_response);
      toast({
        title: 'AI Coach Response Generated',
        description: 'Your personalized plan is ready!',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error fetching AI coach response:', error);
      toast({
        title: 'Error',
        description: 'Failed to generate AI coach response. Please try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box bg="white" w="80%" p={5} shadow="xl">
        <Heading as="h2" size="md" textAlign="center">AIコーチ</Heading>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid templateColumns={{ base: "repeat(2, 1fr)", md: "repeat(3, 1fr)" }} gap={6}>
            <Controller
              name="gender"
              control={control}
              rules={{ required: '必須項目です' }}
              render={({ field }) => (
                <FormControl isInvalid={!!errors.gender}>
                  <FormLabel>性別</FormLabel>
                  <Select {...field} placeholder="性別を選択">
                    <option value="male">男性</option>
                    <option value="female">女性</option>
                    <option value="other">その他</option>
                  </Select>
                  <Text color="red.500">{errors.gender?.message}</Text>
                </FormControl>
              )}
            />

            <Controller
              name="age"
              control={control}
              rules={{ required: '必須項目です'}}
              render={({ field }) => (
                <FormControl isInvalid={!!errors.age}>
                  <FormLabel>年齢</FormLabel>
                  <Select placeholder="年齢を選択" {...field}>
                    {Array.from({ length: 71 }, (_, i) => i + 10).map((age) => (
                      <option key={age} value={age}>
                        {age}
                      </option>
                    ))}
                  </Select>
                  <Text color="red.500">{errors.age?.message}</Text>
                </FormControl>
              )}
            />

            <Controller
              name="trainingLocation"
              control={control}
              rules={{ required: '必須項目です' }}
              render={({ field }) => (
                <FormControl isInvalid={!!errors.trainingLocation}>
                  <FormLabel>トレーニング場所</FormLabel>
                  <Select {...field} placeholder="トレーニング場所を選択">
                    <option value="gym">ジム</option>
                    <option value="home">家庭</option>
                  </Select>
                  <Text color="red.500">{errors.trainingLocation?.message}</Text>
                </FormControl>
              )}
            />
            <Controller
              name="goal"
              control={control}
              rules={{ required: '必須項目です' }}
              render={({ field }) => (
                <FormControl isInvalid={!!errors.goal}>
                  <FormLabel>トレーニングの目的</FormLabel>
                  <Select {...field} placeholder="目的を選択">
                    <option value="loseWight">体重を減らす</option>
                    <option value="loseWeight">筋肉を増やす</option>
                    <option value="loseWeight">筋肉を増やす</option>
                  </Select>
                  <Text color="red.500">{errors.goal?.message}</Text>
                </FormControl>
              )}
            />
            <Controller
              name="trainingDaysPerWeek"
              control={control}
              rules={{ required: '必須項目です', min: { value: 1, message: 'Must be at least 1' }, max: { value: 7, message: 'Cannot exceed 7' } }}
              render={({ field }) => (
                <FormControl isInvalid={!!errors.trainingDaysPerWeek}>
                  <FormLabel>トレーニング日数/週</FormLabel>
                  <Select placeholder="日数を選択" {...field}>
                    {Array.from({ length: 7 }, (_, i) => i + 1).map((days) => (
                      <option key={days} value={days}>
                        {days}
                      </option>                      
                    ))}
                    <option value="おまかせ">おまかせ</option>
                  </Select>
                  <Text color="red.500">{errors.trainingDaysPerWeek?.message}</Text>
                </FormControl>
              )}
            />
            <Controller
              name="exerciseVariety"
              control={control}
              rules={{ required: '必須項目です' }}
              render={({ field }) => (
                <FormControl isInvalid={!!errors.goal}>
                  <FormLabel>1回のトレーニングの種目数</FormLabel>
                  <Select placeholder="種目数を選択" {...field}>
                    {Array.from({ length: 10 }, (_, i) => i + 1).map((variety) => (
                      <option key={variety} value={variety}>
                        {variety}
                      </option>                      
                    ))}
                    <option value="おまかせ">おまかせ</option>
                  </Select>
                  <Text color="red.500">{errors.goal?.message}</Text>
                </FormControl>
              )}
            />
          </Grid>
          <Flex mt={6}>
            <Controller
                name="muscleGroups"
                control={control}
                rules={{ required: '必須項目です' }}
                render={({ field }) => (
                  <MuscleGroupSelector 
                    selectedGroups={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
          </Flex>
          <Flex justifyContent="center" mt={6}>
            <PrimaryButton type="submit" isLoading={isLoading}>
              AIにトレーニングメニューを考えてもらう
            </PrimaryButton>
          </Flex>
        </form>
        {aiResponse && (
          <Box marginTop={6}>
            <Heading as="h3" size="md" marginBottom={3}>AI Coach Recommendation:</Heading>
            <Text whiteSpace="pre-wrap">{aiResponse}</Text>
          </Box>
        )}
      </Box>
  )
})

