import RegisterInputs from "@/app/components/RegisterInputs";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
const card = (
  <>
    <Typography variant="h4" component={"h2"}>
      Registerd
    </Typography>
    <CardContent>
      <RegisterInputs></RegisterInputs>
    </CardContent>
  </>
);
const RegisterPage = () => {
  return (
    <Box
      sx={{ minWidth: 275 }}
      className="flex justify-center items-center min-h-[calc(100vh-150px)] "
    >
      <Card
        variant="outlined"
        sx={{
          width: "100%",
          maxWidth: 480,
          p: 4,
        }}
      >
        {card}
      </Card>
    </Box>
  );
};

export default RegisterPage;
