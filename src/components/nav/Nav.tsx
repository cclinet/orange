import Grid from "@mui/joy/Grid";
import { Stack } from "@mui/joy";

export default function Nav() {
  return (
    <Grid xs={3} component="nav">
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        <div>a</div>
        <div>a</div>
        <div>a</div>
      </Stack>
    </Grid>
  );
}
