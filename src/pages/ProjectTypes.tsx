/* eslint-disable @typescript-eslint/no-unused-vars */
import { ChangeEvent, useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import styled from "styled-components";
import v1Client from "@/apiClient";
import { Input } from "@/components/ui/input";
import { ResourceCreate } from "@/apiClient/data-contracts";
import { Button } from "@/components/ui/button";
import Fuse from "fuse.js";

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
  photo: string | null;
}

/********************************************************************** */
/**************************************************************************
 * *******************************************************************
 */

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
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
    margin: 10px;
  `;
  const Cardsss = styled.div`
    margin: 20px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);

    gap: 20px;
  `;
  const [showForm, setShowForm] = useState<boolean>(false);
  const [newResource, setNewResource] = useState<Ressource>({
    resource_id: 0,
    name: "",
    type: "",
    level: "",
    description: "",
    photo: "",
  });
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewResource((prevResource: any) => ({
      ...prevResource,
      [name]: value,
    }));
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    // Envoyer les données au serveur (à implémenter)
    // Réinitialiser le formulaire après l'envoi des données
    addResource(newResource);
    setNewResource({
      resource_id: 0,
      name: "",
      type: "",
      level: "",
      description: "",
      photo: "",
    });
    // Cacher le formulaire après l'envoi des données
    setShowForm(false);
  };
  const addResource = (ressource: Ressource) => {
    try {
      const res = v1Client.createV1RessourcePost(ressource);
      Setressources([res.data, ...ressources]);
    } catch (error) {
      console.error("Error adding resource:", error);
    }
  };
  /************************************************************************************ */
  /*************************************************************************************** */
  /*************************************************************************************** */
  const [searchTerm, setSearchTerm] = useState("");

  // Initialisation de Fuse avec les ressources et les options de recherche
  const fuse = new Fuse(ressources, {
    keys: ["name", "description", "level", "type"],
  });

  // Fonction de recherche
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };
  // Fonction de recherche

  // Résultats de la recherche
  const searchResults = fuse.search(searchTerm);

  return (
    <>
      {/*<DropdownMenu>
        <DropdownMenuTrigger>CLUB</DropdownMenuTrigger>

        <DropdownMenuContent>
          <ScrollArea className="h-[200px]  rounded-md border p-4">
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
          <ScrollArea className="h-[200px]  rounded-md border p-4">
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

      <div>
        <Input
          style={{ marginTop: "20px", width: "33.33%", marginLeft: "600px" }}
          type="text"
          onChange={handleSearch}
        />
        <ul>
          {searchResults.map((result) => (
            <li key={result.item.resource_id}>{result.item.name}</li>
          ))}
        </ul>
      </div>

      <h1 style={{ marginTop: "20px", width: "33.33%", marginLeft: "800px" }}>
        Our Clubs
      </h1>
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
                  <p>{filteredRessource.description}</p>
                </CardFooter>
              </Card>
            ))}
        </Cardss>
        <div
          style={{
            marginTop: "100px",
            marginBottom: "70px",
          }}
        ></div>{" "}
        {/* Espacement entre les sections */}
        <Cardsss style={{ marginLeft: "20px" }}>
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
                          <ScrollArea className="h-[200px]  rounded-md border p-4">
                            {filteredRessources.map((module) => (
                              <li key={module.resource_id}>{module.name}</li>
                            ))}
                            ;
                          </ScrollArea>
                        </ul>
                      </CardContent>
                    </Card>
                  );
                }
                return null; // Retourne null pour les ressources dupliquées
              });
          })()}
        </Cardsss>
        <div
          style={{
            marginTop: "100px",
            marginBottom: "70px",
            marginLeft: "200px",
          }}
        >
          <Button
            style={{
              marginTop: "20px",
              marginBottom: "20px",
              marginLeft: "730px",
            }}
            onClick={() => setShowForm(true)}
          >
            Ajouter une ressource
          </Button>
          {showForm && (
            <form onSubmit={handleSubmit}>
              <Input
                type="number"
                name="resource_id"
                value={newResource.resource_id}
                onChange={handleInputChange}
                placeholder="ID de la ressource"
              />
              <Input
                type="text"
                name="name"
                value={newResource.name}
                onChange={handleInputChange}
                placeholder="Nom de la ressource"
              />
              <Input
                type="text"
                name="type"
                value={newResource.type}
                onChange={handleInputChange}
                placeholder="Type de ressource"
              />
              <Input
                type="text"
                name="level"
                value={newResource.level}
                onChange={handleInputChange}
                placeholder="Niveau de la ressource"
              />
              <Input
                type="text"
                name="description"
                value={newResource.description}
                onChange={handleInputChange}
                placeholder="Description de la ressource"
              />
              <Button
                style={{
                  marginTop: "20px",
                  marginBottom: "70px",
                  marginLeft: "800px",
                }}
                type="submit"
              >
                Ajouter
              </Button>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default ProjectTypes;
