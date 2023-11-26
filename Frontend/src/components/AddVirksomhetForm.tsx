import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import client, { VirksomhetAdd } from "@/api";

const formSchema = z.object({
  organisasjonsnummer: z.coerce.number().refine((value) => value.toString().length === 9,{
    message: "must be a 9 digit number",  
  }),
  navn: z.string().min(1),
  telefon: z.string().min(1),
  epost: z.string().email("Must be a valid email"),
  adresse: z.string().min(1),
  postnummer: z.coerce.number().refine((value) => value.toString().length === 4,{
    message: "must be a 4 digit number",
  }),
  poststed: z.string().min(1),
});

export function AddVirksomhetForm() {
  const queryClient = useQueryClient();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      organisasjonsnummer: 123456789,
      navn: "e",
      telefon: "94567890",
      epost: "e@e.no",
      poststed: "lalala",
      postnummer: 1234,
      adresse: "bbb",
    },
  });

  const mutate = useMutation({
    mutationFn: async (virksomhet: VirksomhetAdd) => {
      return await client.POST("/Virksomheter", {
        body: virksomhet,
      });
    },
    onSuccess: (e) => {
      if(!e.error){
        queryClient.invalidateQueries({
          queryKey: ["virksomheter"],
        });
      }
    }
  });

  function onSubmit(values: z.infer<typeof formSchema>): void {
    const virksomhet: VirksomhetAdd = {
      organisasjonsnummer: values.organisasjonsnummer,
      navn: values.navn,
      telefon: values.telefon,
      epost: values.epost,
      adresse: {
        adresselinje_1: values.adresse,
        poststed: values.poststed,
        postnummer: values.postnummer,
      },
    };

    mutate.mutate(virksomhet);
  }
  const field = (
    fieldName: keyof z.infer<typeof formSchema>,
    label: string
  ) => {
    return (
      <FormField
        control={form.control}
        name={fieldName}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{label}</FormLabel>
            <FormControl>
              <Input
                placeholder={label}
                type={`${fieldName === "postnummer" ? "number" : "text"}`}
                {...field}
              />
            </FormControl>
            <FormDescription>
              {/* This is your public display name. */}
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  };
  
  const state = () => {
    if (mutate.isError || mutate.data?.error) {
      return "error";
    }
    if (mutate.isSuccess) {
      return "Saved";
    }
    if (mutate.isIdle) {
      return "Save changes";
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {field("organisasjonsnummer", "Organisasjonsnummer")}
        {field("navn", "Navn")}
        {field("telefon", "Telefon")}
        {field("epost", "Epost")}
        {field("adresse", "Adresse")}
        {field("postnummer", "Postnummer")}
        {field("poststed", "Poststed")}
        <div className="flex justify-end">
          <Button className="min-w-[7rem] flex items-center justify-center" type="submit">{state()}</Button>
        </div>
      </form>
    </Form>
  );
}
