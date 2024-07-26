"use client"

import React, { FC, memo, useEffect, useState } from 'react'
import { Box, Button, FormControl, FormLabel, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Select, VStack } from '@chakra-ui/react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import axios from 'axios'
import { API } from '@/app/functions/constants/apis'
import { PrimaryButton } from '@/app/components/atoms/button/PrimaryButton'
import { NumberSelector } from '@/app/components/molecules/NumberSelector'


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

  const { control, handleSubmit, watch } = useForm<WorkoutFormData>()

  const selectedMuscleGroupId = watch('muscle_group_id')

  useEffect(() => {
    // Fetch muscle groups
    const fetchMuscleGroups = async () => {
      try {
        const response = await axios.get(API.muscleGroups)
        setMuscleGroups(response.data)
      } catch (error) {
        console.error("Error fetching muscle groups:", error)
      }      
    };
    fetchMuscleGroups();
  }, []);

  useEffect(() => {
    // Fetch exercises when a muscle group is selected
    const fetchExercises = async () => {
      if(selectedMuscleGroupId) {
        try {
          const response = await axios.get(`${API.exercises}?muscle_group_id=${selectedMuscleGroupId}`)
          setExercises(response.data)
        } catch (error) {
          console.error("Error fetching exercises:", error)
        }
      } else {
        setExercises([])
      }
    }
    fetchExercises()
  }, [selectedMuscleGroupId]);

  const onSubmit = async (data: WorkoutFormData) => {
    setIsLoading(true)
    try {
      await axios.post(API.workout, data)
      alert('Workout log saved successfully!')
    } catch (error) {
      console.error('Error saving workout log:', error)
      alert('Failed to save workout log. Please try again.')
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
