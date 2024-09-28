import bruningLogo from "../assets/img/bruning-logo-redondo.png";
import MainWrapper from "@/components/mainWrapper";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DollarSign, Clock } from "lucide-react";

const Demandas = () => {
  return (
    <MainWrapper title="Demandas">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 p-5">
        <Card className="w-full h-max col-span-1">
          <CardHeader className="gap-2">
            <div className="flex items-center">
              <img src={bruningLogo} alt="" className="h-12 w-auto" />
              <div className="flex flex-col gap-1 ml-2">
                <CardTitle>Modelagem UML</CardTitle>
                <p className="text-sm font-semibold">Bruning Tecnometal</p>
              </div>
            </div>
            <div className="w-max flex gap-2">
              <Badge variant="secondary">Projeto</Badge>
              <Badge variant="secondary">Aberto</Badge>
            </div>
            <CardDescription>
              Lorem ipsum dolor sit amet. Hic possimus velit sit suscipit
              dolorem non voluptatem officia rem sunt quod.
            </CardDescription>
          </CardHeader>
          <CardFooter className="border-t p-2 flex items-center">
            <div className="flex justify-between items-center w-full">
              <div className="flex">
                <Clock size={20} className="mr-2" />
                <span className="text-sm tracking-tight">
                  Criado há dois dias
                </span>
              </div>
              <DollarSign size={20} className="text-red-600" />
            </div>
          </CardFooter>
        </Card>
        <Card className="w-full h-max col-span-1">
          <CardHeader className="gap-2">
            <div className="flex items-center">
              <img src={bruningLogo} alt="" className="h-12 w-auto" />
              <div className="flex flex-col gap-1 ml-2">
                <CardTitle>Teste de Segurança</CardTitle>
                <p className="text-sm font-semibold">Bruning Tecnometal</p>
              </div>
            </div>
            <div className="w-max flex gap-2">
              <Badge variant="secondary">Desafio</Badge>
              <Badge variant="secondary">Aberto</Badge>
            </div>
            <CardDescription>
              Lorem ipsum dolor sit amet. Hic possimus velit sit suscipit
              dolorem non voluptatem officia rem sunt quod.
            </CardDescription>
          </CardHeader>
          <CardFooter className="border-t p-2 flex items-center">
            <div className="flex justify-between items-center w-full">
              <div className="flex">
                <Clock size={20} className="mr-2" />
                <span className="text-sm tracking-tight">
                  Criado há uma semana
                </span>
              </div>
              <DollarSign size={20} className="text-green-600" />
            </div>
          </CardFooter>
        </Card>
        <Card className="w-full h-max col-span-1">
          <CardHeader className="gap-2">
            <div className="flex items-center">
              <img src={bruningLogo} alt="" className="h-12 w-auto" />
              <div className="flex flex-col gap-1 ml-2">
                <CardTitle>Teste de Segurança</CardTitle>
                <p className="text-sm font-semibold">Bruning Tecnometal</p>
              </div>
            </div>
            <div className="w-max flex gap-2">
              <Badge variant="secondary">Desafio</Badge>
              <Badge variant="secondary">Aberto</Badge>
            </div>
            <CardDescription>
              Lorem ipsum dolor sit amet. Hic possimus velit sit suscipit
              dolorem non voluptatem officia rem sunt quod.
            </CardDescription>
          </CardHeader>
          <CardFooter className="border-t p-2 flex items-center">
            <div className="flex justify-between items-center w-full">
              <div className="flex">
                <Clock size={20} className="mr-2" />
                <span className="text-sm tracking-tight">
                  Criado há uma semana
                </span>
              </div>
              <DollarSign size={20} className="text-green-600" />
            </div>
          </CardFooter>
        </Card>
        <Card className="w-full h-max col-span-1">
          <CardHeader className="gap-2">
            <div className="flex items-center">
              <img src={bruningLogo} alt="" className="h-12 w-auto" />
              <div className="flex flex-col gap-1 ml-2">
                <CardTitle>Teste de Segurança</CardTitle>
                <p className="text-sm font-semibold">Bruning Tecnometal</p>
              </div>
            </div>
            <div className="w-max flex gap-2">
              <Badge variant="secondary">Desafio</Badge>
              <Badge variant="secondary">Aberto</Badge>
            </div>
            <CardDescription>
              Lorem ipsum dolor sit amet. Hic possimus velit sit suscipit
              dolorem non voluptatem officia rem sunt quod.
            </CardDescription>
          </CardHeader>
          <CardFooter className="border-t p-2 flex items-center">
            <div className="flex justify-between items-center w-full">
              <div className="flex">
                <Clock size={20} className="mr-2" />
                <span className="text-sm tracking-tight">
                  Criado há uma semana
                </span>
              </div>
              <DollarSign size={20} className="text-green-600" />
            </div>
          </CardFooter>
        </Card>
      </div>
    </MainWrapper>
  );
};

export default Demandas;
