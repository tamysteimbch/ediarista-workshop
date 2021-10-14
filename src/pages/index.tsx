import type { NextPage } from "next";
import SafeEnvironment from "ui/components/feedback/SafeEnvironment/SafeEnvironment";
import PageTitle from "ui/components/data-display/PageTitle/PageTitle";
import UserInformation from "ui/components/data-display/UserInformation/UserInformation";
import TextFieldMask from "ui/components/inputs/TextFieldMask/TextFieldMask";
import { Button, Typography, Container, CircularProgress } from "@mui/material";
import {
  FormElementsContainer,
  ProfissionalPaper,
  ProfissionalContainer,
} from "@styles/pages/index.style";
import useIndex from "data/hooks/pages/useIndex.page";

const Home: NextPage = () => {
  const {
    cep,
    setCep,
    validCep,
    searchProfessionals,
    error,
    professionals,
    doneSearch,
    loading,
    moreProfessionals,
  } = useIndex();
  return (
    <div>
      <SafeEnvironment />
      <PageTitle
        title={"Conheça os profissionais"}
        subtitle={
          "Preencha seu endereço e veja todos os profissionais da sua localidade"
        }
      ></PageTitle>
      <Container>
        <FormElementsContainer>
          <TextFieldMask
            mask={"99.999-999"}
            label={"Digite seu CEP"}
            fullWidth
            variant={"outlined"}
            value={cep}
            onChange={(event) => setCep(event.target.value)}
          />

          {error && <Typography color={"error"}>{error}</Typography>}

          <Button
            variant={"contained"}
            color={"secondary"}
            sx={{ width: "220px" }}
            disabled={!validCep || loading}
            onClick={() => searchProfessionals(cep)}
          >
            {loading ? <CircularProgress size={20} /> : "Buscar"}
          </Button>
        </FormElementsContainer>

        {doneSearch &&
          (professionals.length > 0 ? (
            <ProfissionalPaper>
              <ProfissionalContainer>
                {professionals.map((item, index) => {
                  return (
                    <UserInformation
                      key={index}
                      name={item.full_name}
                      picture={item.user_avatar}
                      rating={item.rating}
                      description={item.city}
                    />
                  );
                })}
              </ProfissionalContainer>
              <Container sx={{ textAlign: "center" }}>
                {moreProfessionals > 0 && (
                  <Typography sx={{ mt: 5 }}>
                    ...e mais {moreProfessionals}{" "}
                    {moreProfessionals > 1
                      ? "profissionais atendem"
                      : "profissional atende"}{" "}
                    ao seu endereço
                  </Typography>
                )}
                <Button
                  variant={"contained"}
                  color={"secondary"}
                  sx={{ mt: 5 }}
                >
                  Contratar um profissional
                </Button>
              </Container>
            </ProfissionalPaper>
          ) : (
            <Typography align={"center"} color={"textPrimary"}>
              Ainda não temos nenhuma diarista disponível em sua região
            </Typography>
          ))}
      </Container>
    </div>
  );
};

export default Home;
