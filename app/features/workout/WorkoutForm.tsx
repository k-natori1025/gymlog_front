"use client"

import React, { FC, memo, useCallback, useEffect, useState } from 'react'
import { Box, FormControl, FormLabel, Select, VStack } from '@chakra-ui/react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { API } from '@/app/functions/constants/apis'
import { PrimaryButton } from '@/app/components/atoms/button/PrimaryButton'
import { NumberSelector } from '@/app/components/molecules/NumberSelector'
import { useApi } from '@/app/functions/hooks/useApi'
import { useCustomToast } from '@/app/functions/hooks/useCustomToast'


interface MuscleGroup {
  id: number;
  name: string;
}

interface Exercise {
  id: number;
  name: string;
  muscle_group_id: number;
}

interface WorkoutFormData {
  muscle_group_id: number;
  exercise_id: number;
  weight: number;
  reps: number;
  sets: number;
}


export const WorkoutForm: FC = memo(() => {
  const [muscleGroups, setMuscleGroups] = useState<MuscleGroup[]>([])
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { showToast } = useCustomToast()

  const { control, handleSubmit, watch } = useForm<WorkoutFormData>()

  const apiClient = useApi()

  const selectedMuscleGroupId = watch('muscle_group_id')
  
  // Fetch muscle groups
  const fetchMuscleGroups = useCallback(async () => {
    setIsLoading(true)
    try {
      const response = await apiClient.get(API.muscleGroups)
      setMuscleGroups(response.data)
    } catch (error) {
      console.error("Error fetching muscle groups:", error)
    } finally {
      setIsLoading(false)
    }
  }, [apiClient])

  // Fetch exercises when a muscle group is selected
  const fetchExercises = useCallback(async () => {
    if(selectedMuscleGroupId) {
      try {
        const response = await apiClient.get(`${API.exercises}?muscle_group_id=${selectedMuscleGroupId}`)
        setExercises(response.data)
      } catch (error) {
        console.error("Error fetching exercises:", error)
      }
    } else {
      setExercises([])
    }
  }, [apiClient, selectedMuscleGroupId])

  useEffect(() => {
    fetchMuscleGroups()
  }, [fetchMuscleGroups])

  useEffect(() => {
    fetchExercises()
  }, [selectedMuscleGroupId, fetchExercises]);

  const onSubmit = async (data: WorkoutFormData) => {
    setIsLoading(true)
    try {
      await apiClient.post(API.workoutLog, data)
      showToast("Success", "Workout log saved successfully!", "success")
    } catch (error) {
      console.error('Error saving workout log:', error)
      showToast("Error", "Failed to save workout log. Please try again.", "error")
    } finally {
      setIsLoading(false)
    }
  };

  return (
    <Box bg="white" w="80%" p={5} shadow="xl">
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing={4}>
          <FormControl>
            <FormLabel>Muscle Group</FormLabel>
            <Controller
              name="muscle_group_id"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Select {...field} placeholder="Select muscle group">
                  {muscleGroups.map((group) => (
                    <option key={group.id} value={group.id}>
                      {group.name}
                    </option>
                  ))}
                </Select>
              )}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Exercise</FormLabel>
            <Controller
              name="exercise_id"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Select {...field} placeholder="Select exercise" isDisabled={!selectedMuscleGroupId}>
                  {exercises.map((exercise) => (
                    <option key={exercise.id} value={exercise.id}>
                      {exercise.name}
                    </option>
                  ))}
                </Select>
              )}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Weight (kg)</FormLabel>
            <Controller
              name="weight"
              control={control}
              rules={{ required: true, min: 0 }}
              render={({ field }) => (
                <NumberSelector min={1} max={300} {...field} />
              )}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Reps</FormLabel>
            <Controller
              name="reps"
              control={control}
              rules={{ required: true, min: 1 }}
              render={({ field }) => (
                <NumberSelector min={1} max={100} {...field} />
              )}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Sets</FormLabel>
            <Controller
              name="sets"
              control={control}
              rules={{ required: true, min: 1 }}
              render={({ field }) => (
                <NumberSelector min={1} max={10} {...field} />
              )}
            />
          </FormControl>

          <PrimaryButton type="submit" isLoading={isLoading}>
            Save Workout Log
          </PrimaryButton>
        </VStack>
      </form>
    </Box>
  );
});
