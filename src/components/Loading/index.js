import { LoadingContainer } from "./styles";

export default function() {
  return (
    <LoadingContainer>
      <div class="spinner-border" role="status">
        <span class="sr-only"></span>
      </div>
    </LoadingContainer>
  )
}