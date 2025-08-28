// components/FormCardExamples.tsx
import React, { useState } from 'react';
import FormCard from '../../components/Feature/FormCard';
import type { SurveyResponses, OptionItem } from '../../../types/formcard';

const FormCardExamples: React.FC = () => {
  const [responses, setResponses] = useState<SurveyResponses>({});

  const handleResponseChange = (questionId: keyof SurveyResponses, value: string | string[] | number): void => {
    setResponses(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const programOptions: OptionItem[] = [
    { label: 'BSCS - Year 1', value: 'bscs-1' },
    { label: 'BSCS - Year 2', value: 'bscs-2' },
    { label: 'BSCS - Year 3', value: 'bscs-3' },
    { label: 'BSIT - Year 1', value: 'bsit-1' },
    { label: 'BSIT - Year 2', value: 'bsit-2' },
    { label: 'BSIT - Year 3', value: 'bsit-3' },
    { label: 'BSGD - Year 1', value: 'bsgd-1' },
    { label: 'BSEMC - Year 1', value: 'bsemc-1' },
    { label: 'BSEMC - Year 2', value: 'bsemc-2' },
    { label: 'BSEMC - Year 3', value: 'bsemc-3' },
    { label: 'ACT - Year 1', value: 'act-1' },
    { label: 'ACT - Year 2', value: 'act-2' }
  ];

  const personalityOptions: OptionItem[] = [
    { label: 'Introvert (Prefers quiet, reflective activities; recharges alone)', value: 'introvert' },
    { label: 'Extrovert (Enjoys social interaction; recharges by being with others)', value: 'extrovert' },
    { label: 'Ambivert (A mix of both; enjoys both solitude and social interaction)', value: 'ambivert' }
  ];

  const handleSubmit = (): void => {
    console.log('Survey responses:', responses);
    // Handle form submission
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-2xl w-full mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Student Survey</h1>
          <p className="text-gray-600">Please answer all questions honestly</p>
        </div>

        {/* Student ID */}
        <FormCard
          variant="text-input"
          title="Student ID"
          placeholder="Enter your student ID"
          value={responses.studentId}
          onChange={(value) => handleResponseChange('studentId', value)}
          required
        />

        {/* Program and Year Level */}
        <FormCard
          variant="dropdown"
          title="Program and Year Level"
          options={programOptions}
          value={responses.program}
          onChange={(value) => handleResponseChange('program', value)}
          required
        />

        {/* Gender */}
        <FormCard
          variant="single-choice"
          title="Gender"
          options={['Male', 'Female', 'Prefer not to say']}
          value={responses.gender}
          onChange={(value) => handleResponseChange('gender', value)}
          required
        />

        {/* GPA */}
        <FormCard
          variant="number-input"
          title="Current GPA"
          subtitle="Enter your current grade point average"
          placeholder="e.g., 3.75"
          value={responses.gpa}
          onChange={(value) => handleResponseChange('gpa', value)}
        />

        {/* Academic Performance */}
        <FormCard
          variant="single-choice"
          title="How do you feel your academic performance has changed this year?"
          options={[
            'Significantly improved',
            'Slightly improved', 
            'Stayed the same',
            'Slightly declined',
            'Significantly declined'
          ]}
          value={responses.performance}
          onChange={(value) => handleResponseChange('performance', value)}
          required
        />

        {/* Workload */}
        <FormCard
          variant="single-choice"
          title="How would you rate your current academic workload?"
          options={['Very easy', 'Easy', 'Moderate', 'Challenging', 'Very challenging']}
          value={responses.workload}
          onChange={(value) => handleResponseChange('workload', value)}
          required
        />

        {/* Learning Style */}
        <FormCard
          variant="multiple-choice"
          title="How do you prefer to learn?"
          subtitle="Select all that apply"
          options={['Visual', 'Auditory', 'Reading/Writing', 'Kinesthetic']}
          value={responses.learningStyle}
          onChange={(value) => handleResponseChange('learningStyle', value)}
          required
        />

        {/* Problem Solving */}
        <FormCard
          variant="single-choice"
          title="How do you usually handle academic challenges?"
          options={[
            'Always asks for help immediately',
            'Asks after trying for a while',
            'Waits too long to ask',
            'Prefers to solve problems alone'
          ]}
          value={responses.problemSolving}
          onChange={(value) => handleResponseChange('problemSolving', value)}
          required
        />

        {/* Personality */}
        <FormCard
          variant="single-choice"
          title="Which personality type best describes you?"
          options={personalityOptions}
          value={responses.personality}
          onChange={(value) => handleResponseChange('personality', value)}
          required
        />

        {/* Hobbies */}
        <FormCard
          variant="multiple-choice"
          title="What activities or hobbies do you enjoy outside of class?"
          subtitle="Select at least 3 options"
          options={[
            'Gaming',
            'Coding/Programming',
            'Reading',
            'Sports/Physical Activity',
            'Arts & Crafts',
            'Watching movies/series',
            'Content creation (vlogging, streaming, writing)'
          ]}
          value={responses.hobbies}
          onChange={(value) => handleResponseChange('hobbies', value)}
          required
        />

        {/* Other Hobbies */}
        <FormCard
          variant="text-input"
          title="Other hobbies not listed above"
          subtitle="Optional: Please specify any other hobbies or activities"
          placeholder="e.g., Photography, Music production..."
          value={responses.otherHobbies}
          onChange={(value) => handleResponseChange('otherHobbies', value)}
        />

        {/* Financial Situation */}
        <FormCard
          variant="single-choice"
          title="How would you describe your current financial situation as a student?"
          options={[
            'Very Comfortable',
            'Comfortable', 
            'Somewhat Challenging',
            'Struggling',
            'Severely Struggling'
          ]}
          value={responses.financial}
          onChange={(value) => handleResponseChange('financial', value)}
          required
        />

        {/* Parents' Relationship */}
        <FormCard
          variant="single-choice"
          title="What is your parents' current relationship status?"
          options={[
            'Together',
            'Separated',
            'One or Both Parents Deceased'
          ]}
          value={responses.parentsStatus}
          onChange={(value) => handleResponseChange('parentsStatus', value)}
          required
        />

        {/* Birth Order */}
        <FormCard
          variant="single-choice"
          title="What is your birth order among your siblings?"
          options={['Youngest', 'Middle Child', 'Oldest', 'Only Child']}
          value={responses.birthOrder}
          onChange={(value) => handleResponseChange('birthOrder', value)}
          required
        />

        {/* External Responsibilities */}
        <FormCard
          variant="textarea"
          title="Do you have major responsibilities outside of school?"
          subtitle="e.g., part-time job, caregiving. Leave blank if none."
          placeholder="Briefly describe your external responsibilities..."
          value={responses.responsibilities}
          onChange={(value) => handleResponseChange('responsibilities', value)}
        />

        <div className="pt-6">
          <button 
            onClick={handleSubmit}
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Submit Survey
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormCardExamples;    