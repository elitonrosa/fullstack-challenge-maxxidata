import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { ProfessionalType } from '../../professional-types/entities/professional-type.entity';

export default class ProfessionalTypes1694662848787 implements Seeder {
  public async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<void> {
    const repository = dataSource.getRepository(ProfessionalType);
    await repository.insert([
      { description: 'Desenvolvedor', status: true },
      { description: 'Analista de Sistemas', status: true },
      { description: 'Analista de Suporte', status: true },
      { description: 'Médico', status: true },
      { description: 'Enfermeiro', status: true },
      { description: 'Fisioterapeuta', status: true },
      { description: 'Nutricionista', status: true },
      { description: 'Psicólogo', status: true },
      { description: 'Assistente Social', status: false },
      { description: 'Fonoaudiólogo', status: true },
      { description: 'Educador Físico', status: true },
      { description: 'Farmacêutico', status: false },
      { description: 'Biomédico', status: true },
      { description: 'Bioquímico', status: true },
      { description: 'Administrador', status: true },
      { description: 'Contador', status: false },
      { description: 'Advogado', status: true },
      { description: 'Técnico de Informática', status: true },
      { description: 'Auxiliar de Serviços Gerais', status: true },
      { description: 'Motorista', status: true },
    ]);
  }
}
