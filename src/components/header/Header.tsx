import Grid from "@mui/joy/Grid";
import ModeToggle from "@/components/header/ModeToggle";

export default function Header() {
  return (
    <Grid xs={12} component="header">
      <ModeToggle />
    </Grid>
  );
}
