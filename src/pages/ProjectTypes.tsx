import { useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import styled from "styled-components";
import v1Client from "@/apiClient";
import { Input } from "@/components/ui/input";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Ressource {
  resource_id: number;
  name: String;
  type: String;
  level: String;
  description: String;
}

const ProjectTypes = () => {
  const [ressources, Setressources] = useState<Ressource[]>([]);

  //async and await
  useEffect(() => {
    const fetchRessources = () => {
      v1Client
        .readResourcesV1RessourceGet()
        .then((res) => {
          Setressources(res.data);
          console.log(res.data);
        })
        .catch((error) => {
          window.alert("error couldn't fetch ressources");
        });
    };
    fetchRessources();
  }, []);

  const Cardss = styled.div`
    left: 100px;
    height: 80px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
    justify-content: center;
    margin: 10px;
  `;
  const Cardsss = styled.div`
    margin: 20px;
    left: 100px;
    height: 80px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
    justify-content: center;
    margin: 10px;
  `;

  return (
    <>
      {/*<DropdownMenu>
        <DropdownMenuTrigger>CLUB</DropdownMenuTrigger>

        <DropdownMenuContent>
          <ScrollArea className="h-[200px] w-[350px] rounded-md border p-4">
            <DropdownMenuLabel className="sticky top-0 bg-zinc-400 blur-sm white">
              Level
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {ressources
              .filter((ressource) => ressource.type === "club")
              .map((filteredRessource) => (
                <DropdownMenuItem key={filteredRessource.resource_id}>
                  {filteredRessource.name}
                </DropdownMenuItem>
              ))}
          </ScrollArea>
        </DropdownMenuContent>
      </DropdownMenu>
      <DropdownMenu>
        <DropdownMenuTrigger>Module</DropdownMenuTrigger>

        <DropdownMenuContent>
          <ScrollArea className="h-[200px] w-[350px] rounded-md border p-4">
            <DropdownMenuLabel className="sticky top-0 bg-zinc-400 blur-sm">
              Level
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {(() => {
              const typesSet = new Set(); // Création d'un ensemble pour stocker les types de ressources uniques
              return ressources
                .filter((ressource) => /^\d/.test(ressource.level)) // Filtrer les ressources par niveau
                .map((filteredRessource) => {
                  if (!typesSet.has(filteredRessource.level)) {
                    // Vérifier la non-duplication
                    typesSet.add(filteredRessource.level); // Ajouter le type de ressource à l'ensemble
                    return (
                      <DropdownMenuItem key={filteredRessource.resource_id}>
                        {filteredRessource.level}
                      </DropdownMenuItem>
                    );
                  }
                  return null; // Retourne null pour les ressources dupliquées
                });
            })()}
          </ScrollArea>
        </DropdownMenuContent>
          </DropdownMenu>*/}
      <Input style={{ marginTop: "20px", width: "1/3" }} />

      <h1>Our Clubs</h1>
      <div>
        <Cardss style={{ marginTop: "20px" }}>
          {ressources
            .filter((ressource) => ressource.type === "club")
            .map((filteredRessource) => (
              <Card key={filteredRessource.resource_id}>
                <CardTitle>{filteredRessource.name}</CardTitle>
                <CardContent>
                  <img src={filteredRessource.photo} alt="" />
                </CardContent>
                <CardFooter>
                  <p>Card Footer</p>
                </CardFooter>
              </Card>
            ))}
        </Cardss>
        <div style={{ marginTop: "500px", marginBottom: "70px" }}></div>{" "}
        {/* Espacement entre les sections */}
        <Cardsss>
          {(() => {
            const typesSet = new Set(); // Création d'un ensemble pour stocker les types de ressources uniques
            return ressources
              .filter((ressource) => /^\d/.test(ressource.level)) // Filtrer les ressources par niveau
              .map((filteredRessource) => {
                if (!typesSet.has(filteredRessource.level)) {
                  // Vérifier la non-duplication
                  typesSet.add(filteredRessource.level); // Ajouter le type de ressource à l'ensemble
                  const filteredRessources = ressources.filter(
                    (ressource) => ressource.level === filteredRessource.level
                  );

                  return (
                    <Card key={filteredRessource.resource_id}>
                      <CardTitle>{filteredRessource.level}</CardTitle>
                      <CardContent>
                        <ul>
                          <ScrollArea className="h-[200px] w-[350px] rounded-md border p-4">
                            {filteredRessources.map((module) => (
                              <li key={module.resource_id}>{module.name}</li>
                            ))}
                            ;
                          </ScrollArea>
                        </ul>
                      </CardContent>
                      <CardFooter>
                        <p>Card Footer</p>
                      </CardFooter>
                    </Card>
                  );
                }
                return null; // Retourne null pour les ressources dupliquées
              });
          })()}
        </Cardsss>
      </div>
    </>
  );
};

export default ProjectTypes;
