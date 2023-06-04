import {
  Box,
  Heading,
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  Stepper,
  StepSeparator,
  StepStatus,
  StepTitle,
  Text,
  useSteps,
  VStack,
} from "@chakra-ui/react";
const Welcome = () => {
  const steps = [
    { title: "ورود", description: "با استفاده از اطلاعات دانشجویی وارد شوید" },
    {
      title: "انتخاب غذا",
      description: "در منوی غذا غذاهای در دسترس را انتخاب کنید",
    },
    { title: "رزرو", description: "بر روی دکمه رزرو کلیک کنید :)" },
  ];
  const { activeStep } = useSteps({
    index: 3,
    count: steps.length,
  });
  return (
    <VStack w="40%" gap="5" alignItems="start">
      <Box>
        <Heading as="h1" color="#23499f">
          سامانه رزرو غذای دانشجویی
        </Heading>
        <Text color="gray.500" mt="2">
          این سامانه به شما این امکان را می‌دهد تا بتوانید به راحتی و با سرعت
          غذای خود را رزرو کنید. با استفاده از این سامانه می‌توانید غذای خود را
          مطابق با سلیقه.
        </Text>
      </Box>
      <Stepper index={activeStep} orientation="vertical" height="200px" gap="0">
        {steps.map((step, index) => (
          <Step key={index}>
            <StepIndicator>
              <StepStatus
                complete={<StepIcon />}
                incomplete={<StepNumber />}
                active={<StepNumber />}
              />
            </StepIndicator>

            <Box flexShrink="1">
              <StepTitle>{step.title}</StepTitle>
              <StepDescription>{step.description}</StepDescription>
            </Box>

            <StepSeparator />
          </Step>
        ))}
      </Stepper>
    </VStack>
  );
};

export default Welcome;
